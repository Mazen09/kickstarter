const categories = [
  { _id: "categoryId", name: "Music" },
  { _id: "1", name: "Programming" },
  { _id: "3", name: "Sport" },
  { _id: "4", name: "Food" }
];

export function getCategories() {
  //   return http.get(apiUrl + "/categories");
  return categories;
}

export function getExpertCategories(userid) {
  return [
    { name: "Music" },
    { name: "Programming" },
    { name: "Sport" },
    { name: "Food" }
  ];
}

export function getCategory(id) {
  const category = categories.find(c => c._id === id);
  return category.name;
}
