import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Blog_Sidebar from "../components/Blog_Sidebar";

const Blog = () => {

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBlogs("food");
  }, []);

  const fetchBlogs = async (tag = "food") => {

    const res = await fetch(
      `https://dev.to/api/articles?tag=${tag}&per_page=10`
    );

    const data = await res.json();

    const formatted = data.map((post) => ({
      id: post.id,
      title: post.title,

      image:
        post.cover_image ||
        post.social_image ||
        `https://source.unsplash.com/400x300/?${tag}`,

      date: post.published_at
        ? new Date(post.published_at).toLocaleDateString()
        : "No date",

      description: post.description,

      category: tag
    }));

    setBlogs(formatted);
  };

  // Search filter
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-10">
        Our News
      </h1>

      <div className="grid grid-cols-3 gap-12">

        {/* BLOG LIST */}

        <div className="col-span-2 space-y-8">

          {filteredBlogs.length === 0 && (
            <p>No blogs found</p>
          )}

          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}

        </div>

        {/* SIDEBAR */}

        <Blog_Sidebar
          search={search}
          setSearch={setSearch}
          blogs={blogs}
          fetchBlogs={fetchBlogs}
        />

      </div>

    </div>
  );
};

export default Blog;