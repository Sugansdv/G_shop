import { Link } from "react-router-dom";
const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}`} state={blog}>
      <div className="flex gap-5 border-b pb-6 hover:bg-gray-50 p-2 rounded">

       <div className="w-44 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
  <img
    src={blog.image}
    alt={blog.title}
    className="max-w-full max-h-full object-contain"
  />
</div>

        <div>
          <h3 className="text-lg font-semibold">
            {blog.title}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {blog.date}
          </p>

          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded mt-2 inline-block">
            {blog.category}
          </span>
        </div>

      </div>
    </Link>
  );
};
export default BlogCard;