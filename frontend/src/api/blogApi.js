const categories = [
  "shopping tips",
  "grocery",
  "fruits & vegetables",
  "organic food",
];

export const fetchBlogs = async () => {
  const res = await fetch(
    "https://dev.to/api/articles?per_page=30"
  );

  const data = await res.json();

  return data.map((post) => {

    // Assign category randomly from your list
    const category =
      categories[Math.floor(Math.random() * categories.length)];

    return {
      id: post.id,
      title: post.title,

      image:
        post.cover_image ||
        post.social_image ||
        `https://source.unsplash.com/400x300/?food,fruit,organic&sig=${post.id}`,

      date: post.published_at
        ? new Date(post.published_at).toLocaleDateString()
        : "No date",

      category,
    };
  });
};