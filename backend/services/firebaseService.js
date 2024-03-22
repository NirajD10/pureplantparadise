const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
  listAll,
} = require("firebase/storage");
const { uid } = require("uid/single");
const { firebaseapp } = require("../config/firebase.config");

const storage = getStorage(firebaseapp);

const uploadImageToFirebase = async (fileImages, directory) => {
  try {
    if (!fileImages) {
      const error = new Error("File didn't correctly received.");
      error.statusCode = 404;
      throw error;
    }

    //Check conditions whether incoming file image is multiple or single
    if (Array.isArray(fileImages)) {
      const multipleImageUrl = await Promise.all(
        fileImages?.map(async (fimage) => {
          const storageRef = ref(
            storage,
            `${directory}/${uid(15)}_${fimage?.originalname}`
          );

          const metadata = {
            contentType: fimage?.mimetype,
          };

          const snapshot = await uploadBytesResumable(
            storageRef,
            fimage?.buffer,
            metadata
          );

          const getUrlImage = await getDownloadURL(snapshot.ref);

          if (!getUrlImage) {
            const error = new Error("Couldn't get url image");
            error.statusCode = 404;
            throw error;
          }
          return getUrlImage;
        })
      );
      return multipleImageUrl;
    } else {
      const storageRef = ref(
        storage,
        `${directory}/${uid(15)}_${fileImages?.originalname}`
      );

      const metadata = {
        contentType: fileImages?.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        fileImages?.buffer,
        metadata
      );

      const getUrlImage = await getDownloadURL(snapshot.ref);

      if (!getUrlImage) {
        const error = new Error("Couldn't get url image");
        error.statusCode = 404;
        throw error;
      }

      return getUrlImage;
    }
  } catch (error) {
    next(error);
  }
};

const removeImage = (fileurl, next) => {
  const fileRef = ref(storage, fileurl);
  // console.log("File in database before delete exists : " + fileRef);
  const deletionImage = deleteObject(fileRef)
    .then(() => {
      // console.log("File successfully deleted");
      return true;
    })
    .catch((error) => {
      return error;
    });
  
    return deletionImage;
};

const getHomeBannerImage = () => {
  const fileRef = ref(storage, "Home_Banner");

  const bannerUrl = listAll(fileRef)
  .then(async (res) => {
    const { items } = res;
    const urls = await Promise.all(
      items.map((item) => getDownloadURL(item))
    );

    // Array of download URLs of all files in that folder
    // console.log(urls);
    return urls;
  }).catch((error) => {
    return error
  });

  return bannerUrl;
}

module.exports = {
  uploadImageToFirebase,
  removeImage,
  getHomeBannerImage
};
