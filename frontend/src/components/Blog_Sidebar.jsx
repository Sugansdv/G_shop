import { Link } from "react-router-dom";

const categories = [
  { name: "shopping tips", tag: "shopping" },
  { name: "grocery", tag: "grocery" },
  { name: "fruits & vegetables", tag: "vegetables" },
  { name: "organic food", tag: "organic" },
];

const Blog_Sidebar = ({
  search,
  setSearch,
  blogs,
  fetchBlogs,
}) => {
  return (
    <div className="space-y-10">

      {/* SEARCH */}

      <div>
        <h3 className="font-semibold mb-3">
          Search
        </h3>

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search blogs..."
          className="w-full border p-2 rounded-lg"
        />
      </div>

      {/* POPULAR CATEGORY */}

      <div>
        <h3 className="font-semibold mb-3">
          Popular Category
        </h3>

        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => fetchBlogs(cat.tag)}
              className="border p-2 rounded-lg capitalize hover:bg-green-100"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* RECENT POSTS */}

      <div>
        <h3 className="font-semibold mb-4">
          Recent Posts
        </h3>

        {blogs.slice(0, 4).map((post) => (
          <Link
            to={`/blog/${post.id}`}
            state={post}
            key={post.id}
            className="flex gap-3 mb-4 hover:bg-gray-50 p-1 rounded cursor-pointer"
          >

            <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
  <img
    src={post.image}
    alt={post.title}
    className="max-w-full max-h-full object-contain"
    onError={(e) => {
      e.target.src =
        "https://source.unsplash.com/200x200/?food";
    }}
  />
</div>

            <p className="text-sm">
              {post.title.slice(0, 45)}
            </p>

          </Link>
        ))}

      </div>

    </div>
  );
};

export default Blog_Sidebar;