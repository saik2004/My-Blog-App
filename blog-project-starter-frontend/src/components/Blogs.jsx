import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Footer from "./common/Footer";
import auth from "../config/firebase";

const ADMIN_ID = process.env.REACT_APP_ADMIN_ID;
const API_URL = process.env.REACT_APP_API_URL;

function Blogs() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch blogs
    axios
      .get(`${API_URL}/api/blogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((error) => {
        console.log("Error fetching blogs:", error);
      });

    // Check Firebase authentication and admin status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.uid === ADMIN_ID) {
        setadmin(true);
      } else {
        setadmin(false);
      }
    });

    // Clean up the Firebase listener
    return () => unsubscribe();
  }, []);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isAdmin, setadmin] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogs, setExpandedBlogs] = useState([]);
  const [deleteError, setDeleteError] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const toggleBlog = (blogId) => {
    setExpandedBlogs((prev) =>
      prev.includes(blogId)
        ? prev.filter((id) => id !== blogId)
        : [...prev, blogId],
    );
  };

  const handleLike = async (blog_id) => {
    try {
      const token = await auth.currentUser.getIdToken();

      const response = await axios.patch(
        `${API_URL}/api/blogs/like/${blog_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // After successfully updating the likes count in the backend, fetch the updated list of blogs
      if (response.status === 200) {
        axios
          .get(`${API_URL}/api/blogs`)
          .then((res) => {
            // console.log(res.data);
            setBlogs(res.data);
          })
          .catch(() => {
            console.log("Error fetching data");
          });
      }
    } catch (error) {
      console.error("Error liking the blog post:", error);
    }
  };

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    const token = await auth.currentUser.getIdToken();
    const today = new Date();
    const date = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const likes = 0;
    axios
      .post(
        `${API_URL}/api/blogs`,
        {
          newTitle,
          date,
          newContent,
          likes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        // console.log(res.data);

        axios
          .get(`${API_URL}/api/blogs`)
          .then((res) => {
            // console.log(res.data);
            setBlogs(res.data);
          })
          .catch(() => {
            console.log("Error fetching data");
          });
      });

    setNewTitle("");
    setNewContent("");
  };

  const handleDeleteBlog = async (blogId) => {
    setDeleteError((prev) => ({
      ...prev,
      [blogId]: "",
    }));

    try {
      const token = await auth.currentUser.getIdToken();

      const response = await axios.delete(`${API_URL}/api/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.success) {
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== blogId),
        );

        setExpandedBlogs((prev) => prev.filter((id) => id !== blogId));

        setConfirmDeleteId(null);
      } else {
        setDeleteError((prev) => ({
          ...prev,
          [blogId]: response.data.message || "Unable to delete this article.",
        }));
      }
    } catch (error) {
      setDeleteError((prev) => ({
        ...prev,
        [blogId]:
          error.response?.data?.message ||
          "Something went wrong while deleting this article.",
      }));
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-[#111111]">
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Section Heading */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 border-2 border-black bg-[#D9F36A] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em]">
              <span className="h-2 w-2 rounded-full bg-black" />
              The Blog Journal
            </p>

            <h2 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Ideas worth
              <br />
              <span className="text-[#8BAA24]">sharing.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-gray-600 sm:text-base">
            Thoughts, lessons, and discoveries from the world of development —
            written one experience at a time.
          </p>
        </div>

        {/* Blog Count */}
        <div className="mb-6 flex items-center justify-between border-y-2 border-black py-3 sm:mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.16em] sm:text-sm">
            Latest Articles
          </span>

          <span className="border-2 border-black bg-[#D9F36A] px-3 py-1 text-xs font-black sm:text-sm">
            {blogs.length} {blogs.length === 1 ? "ARTICLE" : "ARTICLES"}
          </span>
        </div>

        {/* Admin Blog Creation Form */}
        {isAdmin && (
          <div className="mb-10 border-2 border-black bg-[#F5F5F0] p-3 shadow-[3px_3px_0px_#111111] sm:mb-14 sm:p-5 md:p-8 md:shadow-[8px_8px_0px_#111111]">
            {/* Form Header */}
            <div className="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-600 sm:mb-2 sm:text-xs">
                  Admin Workspace
                </p>

                <h3 className="text-xl font-black tracking-tight sm:text-3xl">
                  Publish a new story
                  <span className="text-[#8BAA24]">.</span>
                </h3>
              </div>

              <span className="w-fit border-2 border-black bg-white px-2.5 py-1 text-[10px] font-bold uppercase sm:px-3 sm:text-xs">
                New article
              </span>
            </div>

            <form
              onSubmit={handleNewBlogSubmit}
              className="flex w-full flex-col gap-4 sm:gap-5"
            >
              {/* Blog Title */}
              <div className="w-full">
                <label
                  htmlFor="blog-title"
                  className="mb-1.5 block text-xs font-bold sm:mb-2 sm:text-sm"
                >
                  Blog title
                </label>

                <input
                  id="blog-title"
                  type="text"
                  placeholder="Give your article a strong title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="block w-full min-w-0 border-2 border-black bg-white px-3 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:bg-[#F9FCEB] focus:ring-2 focus:ring-[#D9F36A] sm:px-4 sm:py-3.5 sm:text-base"
                  required
                />
              </div>

              {/* Blog Content */}
              <div className="w-full">
                <label
                  htmlFor="blog-content"
                  className="mb-1.5 block text-xs font-bold sm:mb-2 sm:text-sm"
                >
                  Article content
                </label>

                <textarea
                  id="blog-content"
                  placeholder="Start writing your thoughts here..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="block min-h-[120px] w-full min-w-0 resize-y border-2 border-black bg-white px-3 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:bg-[#F9FCEB] focus:ring-2 focus:ring-[#D9F36A] sm:min-h-[220px] sm:px-4 sm:py-4 sm:text-base sm:leading-7 lg:min-h-[300px]"
                  rows={5}
                  required
                />
              </div>

              {/* Publish Button */}
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="w-full border-2 border-black bg-[#D9F36A] px-4 py-3 text-xs font-black uppercase tracking-wide shadow-[3px_3px_0px_#111111] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#111111] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none sm:w-auto sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  + Publish Article
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blog Cards */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
            {blogs
              .slice()
              .reverse()
              .map((blog, index) => {
                const isExpanded = expandedBlogs.includes(blog._id);

                return (
                  <article
                    key={blog._id}
                    className="group flex h-full min-w-0 flex-col border-2 border-black bg-white p-4 transition duration-200 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#D9F36A] sm:p-6 sm:hover:shadow-[6px_6px_0px_#D9F36A]"
                  >
                    {/* Card Header */}
                    <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
                      <span className="border-2 border-black bg-[#D9F36A] px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] sm:text-xs">
                        Article
                      </span>

                      <span className="text-xs font-bold text-gray-400">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 break-words text-xl font-black leading-snug tracking-tight sm:text-2xl">
                      {blog.newTitle}
                    </h3>

                    {/* Date */}
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:mb-5 sm:text-xs">
                      {blog.date}
                    </p>

                    {/* Divider */}
                    <div className="mb-4 h-[2px] w-12 bg-[#D9F36A] transition-all duration-300 group-hover:w-20 sm:mb-5" />

                    {/* Article Content */}
                    <p className="mb-3 whitespace-pre-wrap break-words text-sm leading-7 text-gray-600 sm:mb-4 sm:text-[15px]">
                      {isExpanded
                        ? blog.newContent
                        : blog.newContent.length > 180
                          ? `${blog.newContent.slice(0, 180).trim()}...`
                          : blog.newContent}
                    </p>

                    {/* Read More / Show Less */}
                    {blog.newContent.length > 180 && (
                      <button
                        type="button"
                        onClick={() => toggleBlog(blog._id)}
                        className="mb-5 w-fit text-xs font-bold underline decoration-2 underline-offset-4 transition hover:text-[#8BAA24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:mb-6 sm:text-sm"
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "Show less ↑" : "Read full article →"}
                      </button>
                    )}

                    {/* Card Footer */}
                    <div className="mt-auto border-t-2 border-gray-100 pt-4">
                      {/* Like Row */}
                      <div className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => handleLike(blog._id)}
                          className="inline-flex min-h-9 items-center gap-2 border-2 border-black px-3 py-2 text-xs font-bold transition hover:bg-[#D9F36A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:min-h-10 sm:text-sm"
                          aria-label={`Like ${blog.newTitle}`}
                        >
                          <span aria-hidden="true">♡</span>
                          <span>Like</span>
                        </button>

                        <span className="text-right text-xs font-bold text-gray-500 sm:text-sm">
                          {blog.likes} {blog.likes === 1 ? "Like" : "Likes"}
                        </span>
                      </div>

                      {/* Admin Delete Action */}
                      {/* Admin Delete Action */}
                      {isAdmin && (
                        <div className="mt-3">
                          {/* Delete Button */}
                          <div className="flex justify-start">
                            <button
                              type="button"
                              onClick={() => {
                                setDeleteError((prev) => ({
                                  ...prev,
                                  [blog._id]: "",
                                }));

                                setConfirmDeleteId((prev) =>
                                  prev === blog._id ? null : blog._id,
                                );
                              }}
                              className="inline-flex min-h-9 items-center gap-2 border-2 border-black bg-white px-3 py-2 text-[10px] font-black uppercase tracking-wide transition-colors duration-200 hover:bg-red-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:min-h-10 sm:px-4 sm:text-xs"
                              aria-expanded={confirmDeleteId === blog._id}
                              aria-label={`Delete article: ${blog.newTitle}`}
                            >
                              <span aria-hidden="true">×</span>
                              <span>Delete Article</span>
                            </button>
                          </div>

                          {/* Inline Confirmation Panel */}
                          {confirmDeleteId === blog._id && (
                            <div className="mt-3 border-2 border-black bg-[#F5F5F0] p-3 shadow-[3px_3px_0px_#111111] sm:p-4">
                              <p className="text-sm font-black">
                                Delete this article?
                              </p>

                              <p className="mt-1 text-xs leading-5 text-gray-600">
                                This action cannot be undone.
                              </p>

                              <div className="mt-3 flex flex-wrap gap-2">
                                {/* Cancel */}
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="border-2 border-black bg-white px-3 py-2 text-xs font-bold transition hover:bg-gray-200"
                                >
                                  Cancel
                                </button>

                                {/* Confirm Delete */}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteBlog(blog._id)}
                                  className="border-2 border-black bg-red-500 px-3 py-2 text-xs font-black text-white transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                  Yes, Delete
                                </button>
                              </div>

                              {/* API Error Message */}
                              {deleteError[blog._id] && (
                                <div
                                  role="alert"
                                  className="mt-3 border-2 border-red-600 bg-red-50 p-3 text-xs leading-5 text-red-800"
                                >
                                  {deleteError[blog._id]}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
          </div>
        ) : (
          /* Empty State */
          <div className="border-2 border-dashed border-gray-300 px-4 py-12 text-center sm:px-5 sm:py-20">
            <div
              className="mb-4 text-4xl sm:mb-5 sm:text-5xl"
              aria-hidden="true"
            >
              ✳
            </div>

            <h3 className="mb-2 text-xl font-black sm:text-3xl">
              Nothing published yet.
            </h3>

            <p className="mx-auto max-w-sm text-sm leading-7 text-gray-500">
              The next great idea could start here. Check back soon for fresh
              articles and stories.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Blogs;
