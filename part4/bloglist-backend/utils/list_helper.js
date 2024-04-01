const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  const likes = blogs.map((blog) => blog.likes)
  const total = likes.reduce(reducer, 0)
  return blogs.length === 0 ? 0 : total
}

const favouriteBlog = (blogs) => {
  const likes = Math.max(...blogs.map((b) => b.likes))
  const favourite = blogs.find((b) => b.likes === likes)
  return favourite
}

const mostBlogs = (blogs) => {
  const blogOfSameAuthor = blogs.map((blog) => {
    const blogList = blogs.filter((__blog) => __blog.author === blog.author)

    return blogList
  })

  function longest_in_array() {
    let max_arr = blogOfSameAuthor[0].length
    let ans = blogOfSameAuthor[0]

    for (let i = 1; i < blogOfSameAuthor.length; i++) {
      let maxi = blogOfSameAuthor[i].length

      if (maxi > max_arr) {
        ans = blogOfSameAuthor[i]
      }
    }

    return ans
  }

  return {
    author: longest_in_array()[0].author,
    blogs: longest_in_array().length,
  }
}

const mostLikes = (blogs) => {
  const blogOfSameAuthor = blogs.map((blog) => {
    const blogList = blogs.filter((__blog) => __blog.author === blog.author)

    return blogList
  })

  let like = 0
  let author = ''

  for (let i = 0; i < blogOfSameAuthor.length; i++) {
    let maxi = 0
    blogOfSameAuthor[i].forEach((blog) => (maxi += blog.likes))

    if (maxi > like) {
      author = blogOfSameAuthor[i][0].author
      like = maxi
    }
  }

  return {
    author: author,
    likes: like,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
