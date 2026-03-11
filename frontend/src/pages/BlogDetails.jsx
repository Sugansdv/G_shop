import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const BlogDetails = () => {

  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {

    const fetchBlog = async () => {

      const res = await fetch(
        `https://dev.to/api/articles/${id}`
      );

      const data = await res.json();
      setBlog(data);

    };

    fetchBlog();

  }, [id]);

  if (!blog) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-10">

      <img
        src={blog.cover_image || blog.social_image}
        alt={blog.title}
        className="w-full h-96 object-cover rounded mb-6"
      />

      <h1 className="text-3xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-500 mb-6">
        {new Date(blog.published_at).toLocaleDateString()}
      </p>

      <div className="prose max-w-none">
        <ReactMarkdown>
          {blog.body_markdown}
        </ReactMarkdown>
      </div>

    </div>
  );
};

export default BlogDetails;