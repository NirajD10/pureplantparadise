function sortBySelectionAggerationStages(sortBy) {
  switch (sortBy) {
    case "latest":
      return { createdAt: -1 };

    case "lowprice":
      return { price: 1 };
    case "highprice":
      return { price: -1 };

    default:
      return;
  }
}

module.exports = {
  sortBySelectionAggerationStages,
};
