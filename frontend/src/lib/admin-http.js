import axios from "axios";

let url = import.meta.env.VITE_BACKEND;

// Dashboard
export function getDashboard({ signal }) {
  const adminToken = localStorage.getItem("admin-token");
  const dashboardData = axios
    .get(url + "/admin/dashboard", {
      signal,
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return dashboardData;
}

// Categories Data
export function getAdminCategories() {
  const adminToken = localStorage.getItem("admin-token");
  const categories = axios
    .get(url + "/admin/categories", {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return categories;
}

// Attributes Data
export function getAdminAttributes() {
  const adminToken = localStorage.getItem("admin-token");
  const attributes = axios
    .get(url + "/admin/attributes", {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return attributes;
}

// Get Attribute list for select input
export function getAdminInputAttributes({ id, signal }) {
  const adminToken = localStorage.getItem("admin-token");
  const attributes = axios
    .get(url + "/admin/attributes/" + id, {
      signal,
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return attributes;
}

// Get Customer list
export function getCustomerList() {
  const adminToken = localStorage.getItem("admin-token");
  const customers = axios
    .get(url + "/admin/customer-list", {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return customers;
}

// Get Single Customer detail
export function getSingleCustomerDetail({ id, signal }) {
  const adminToken = localStorage.getItem("admin-token");
  const singleCustomer = axios
    .get(url + "/admin/single-customer-detail/" + id, {
      signal: signal,
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return singleCustomer;
}

// Get Single Order Details
export function getSingleOrderDetail(id, signal) {
  const adminToken = localStorage.getItem("admin-token");
  const orderdetails = axios
    .get(url + "/admin/orders/" + id, {
      signal: signal,
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return orderdetails;
}

//Post Delete Single Products
export function postDeleteProductAdminAction({id, signal}) {
  const adminToken = localStorage.getItem("admin-token");
  const deleteProduct = axios
    .delete(url + "/admin/products/" + id, {
      signal: signal,
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        // console.log(response.data);
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return deleteProduct;
}


// Post Delete Single Attributes
export function postDeleteAdminAction({ id, signal }) {
  const adminToken = localStorage.getItem("admin-token");
  const deleteAttribute = axios
    .delete(url + "/admin/attributes/" + id, {
      signal: signal,
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        // console.log(response.data);
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return deleteAttribute;
}

// POST Create category
export async function postnewCategory(data) {
  const adminToken = localStorage.getItem("admin-token");
  //copy object and delete two property(thumbnail and breadcrumbanner [nothing value there]) to be sent json data.
  const enteredData = Object.assign({}, data);
  delete enteredData.thumbnail;
  delete enteredData.breadcrumbbanner;

  const formData = new FormData();
  //image data append as thumbnail and breadcrumbbanner
  formData.append("thumbnail", data.thumbnail);
  formData.append("breadcrumbbanner", data.breadcrumbbanner);
  formData.append("inputdata", JSON.stringify(enteredData));

  const response = await fetch(
    `${import.meta.env.VITE_ADMIN_AUTH_API_URL}categories`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return await response.json();
}

//PUT update category
export async function putCatgory(id, data) {
  let response;
  const adminToken = localStorage.getItem("admin-token");
  if (
    typeof data.thumbnail === "object" &&
    typeof data.breadcrumbbanner === "object"
  ) {
    const enteredData = Object.assign({}, data);
    delete enteredData.thumbnail;
    delete enteredData.breadcrumbbanner;

    const formData = new FormData();
    //image data append as thumbnail and breadcrumbbanner
    formData.append("thumbnail", data.thumbnail);
    formData.append("breadcrumbbanner", data.breadcrumbbanner);
    formData.append("inputdata", JSON.stringify(enteredData));

    response = await fetch(
      `${import.meta.env.VITE_ADMIN_AUTH_API_URL}categories/edit/` + id,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + adminToken,
        },
      }
    );
  } else if (typeof data?.breadcrumbbanner === "object") {
    const enteredData = Object.assign({}, data);
    delete enteredData.breadcrumbbanner;

    const formData = new FormData();
    //image data append as breadcrumbbanner
    formData.append("breadcrumbbanner", data.breadcrumbbanner);
    formData.append("inputdata", JSON.stringify(enteredData));

    response = await fetch(
      `${import.meta.env.VITE_ADMIN_AUTH_API_URL}categories/edit/` + id,
      {
        method: "PUT",
        body: formData,
      }
    );
  } else if (typeof data?.thumbnail === "object") {
    const enteredData = Object.assign({}, data);
    delete enteredData.thumbnail;

    const formData = new FormData();
    //image data append as thumbnail
    formData.append("thumbnail", data.thumbnail);
    formData.append("inputdata", JSON.stringify(enteredData));

    response = await fetch(
      `${import.meta.env.VITE_ADMIN_AUTH_API_URL}categories/edit/` + id,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + adminToken,
        },
      }
    );
  } else {
    // console.log("Conditions meet");
    response = await fetch(
      `${import.meta.env.VITE_ADMIN_AUTH_API_URL}categories/edit/` + id,
      {
        method: "PUT",
        body: JSON.stringify({ inputdata: data }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminToken,
        },
      }
    );
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return await response.json();
}

// POST create new attribute
export async function postAttribute(data) {
  const adminToken = localStorage.getItem("admin-token");
  const response = await fetch(
    `${import.meta.env.VITE_ADMIN_AUTH_API_URL}attributes`,
    {
      method: "POST",
      body: JSON.stringify(data, null, 2),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + adminToken,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return await response.json();
}

//PUT update single attribute
export async function putAttribute(id, data) {
  const adminToken = localStorage.getItem("admin-token");
  const response = await fetch(
    `${import.meta.env.VITE_ADMIN_AUTH_API_URL}attributes/edit/` + id,
    {
      method: "PUT",
      body: JSON.stringify({ attribute_data: data }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + adminToken,
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return await response.json();
}

// POST create new product
export async function postProduct(data) {
  const adminToken = localStorage.getItem("admin-token");
  //copy object and delete two property(media and featureimage [nothing value there instead they are files]).
  const enteredData = Object.assign({}, data);
  delete enteredData.media;
  delete enteredData.featureimage;

  const formData = new FormData();
  const mediaFiles = data.media;

  //image data append as media and featureimage
  mediaFiles.forEach((file, index) => {
    formData.append("media", file);
  });
  formData.append("featureimage", data.featureimage);
  formData.append("productInputData", JSON.stringify(enteredData));

  const response = await fetch(
    `${import.meta.env.VITE_ADMIN_AUTH_API_URL}products/new`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return await response.json();
}

//PUT Edit single Product detail
export async function editProduct(id, data) {
  let response;
  const adminToken = localStorage.getItem("admin-token");
  if (typeof data.featureimage === "object") {
    const enteredData = Object.assign({}, data);
    delete enteredData.featureimage;

    const formData = new FormData();
    formData.append("featureimage", data.featureimage);
    formData.append("inputdata", JSON.stringify(enteredData));

    response = await fetch(
      `${import.meta.env.VITE_ADMIN_AUTH_API_URL}products/edit/` + id,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: "Bearer " + adminToken,
        },
      }
    );
  } else {
    response = await fetch(
      `${import.meta.env.VITE_ADMIN_AUTH_API_URL}products/edit/` + id,
      {
        method: "PUT",
        body: JSON.stringify({ inputdata: data }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminToken,
        },
      }
    );
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return await response.json();
}
