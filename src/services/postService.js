import http from "./httpService";

const posts = [
  {
    _id: "1",
    username: "john doe",
    date: "1-1-2001",
    category_id: "1",
    title: "Title",
    tags: ["t1", "t2", "t3", "t4"],
    content: `# hello there \nthis is aparagraph \n<pre>this is some code</pre>\n[link to google](https://www.google.com)\n</br><img src="https://via.placeholder.com/150" class="rounded">`,
    likes: 100,
    dislikes: 10
  },
  {
    _id: "2",
    username: "john doe",
    date: "1-1-2001",
    category_id: "1",
    title: "Title",
    tags: ["t1", "t2", "t3", "t4"],
    content: `# hello there \nthis is aparagraph \n<pre>this is some code</pre>\n[link to google](https://www.google.com)\n</br><img src="https://via.placeholder.com/150" class="rounded">`,
    likes: 100,
    dislikes: 10
  },
  {
    _id: "3",
    username: "john doe",
    date: "1-1-2001",
    category_id: "1",
    title: "Title",
    tags: ["t1", "t2", "t3", "t4"],
    content: `# hello there \nthis is aparagraph \n<pre>this is some code</pre>\n[link to google](https://www.google.com)\n</br><img src="https://via.placeholder.com/150" class="rounded">`,
    likes: 100,
    dislikes: 10
  },
  {
    _id: "4",
    username: "john doe",
    date: "1-1-2001",
    category_id: "1",
    title: "Title",
    tags: ["t1", "t2", "t3", "t4"],
    content: `# hello there \nthis is aparagraph \n<pre>this is some code</pre>\n[link to google](https://www.google.com)\n</br><img src="https://via.placeholder.com/150" class="rounded">`,
    likes: 100,
    dislikes: 10
  },
  {
    _id: "5",
    username: "john doe",
    date: "1-1-2001",
    category_id: "1",
    title: "Title",
    tags: ["t1", "t2", "t3", "t4"],
    content: `# hello there \nthis is aparagraph \n<pre>this is some code</pre>\n[link to google](https://www.google.com)\n</br><img src="https://via.placeholder.com/150" class="rounded">`,
    likes: 100,
    dislikes: 10
  },
  {
    _id: "6",
    username: "john doe",
    date: "1-1-2001",
    category_id: "1",
    title: "Title",
    tags: ["t1", "t2", "t3", "t4"],
    content: `# hello there \nthis is aparagraph \n<pre>this is some code</pre>\n[link to google](https://www.google.com)\n</br><img src="https://via.placeholder.com/150" class="rounded">`,
    likes: 100,
    dislikes: 10
  },
  {
    _id: "7",
    username: "john doe",
    date: "1-1-2001",
    category_id: "1",
    title: "Title",
    tags: ["t1", "t2", "t3", "t4"],
    content: `# hello there \nthis is aparagraph \n<pre>this is some code</pre>\n[link to google](https://www.google.com)\n</br><img src="https://via.placeholder.com/150" class="rounded">`,
    likes: 100,
    dislikes: 10
  },
  {
    _id: "8",
    username: "john doe",
    date: "1-1-2001",
    category_id: "1",
    title: "Title",
    tags: ["t1", "t2", "t3", "t4"],
    content: `# hello there \nthis is aparagraph \n<pre>this is some code</pre>\n[link to google](https://www.google.com)\n</br><img src="https://via.placeholder.com/150" class="rounded">`,
    likes: 100,
    dislikes: 10
  },
  {
    _id: "9",
    username: "john doe",
    date: "1-1-2001",
    category_id: "1",
    title: "Title",
    tags: ["t1", "t2", "t3", "t4"],
    content: `# hello there \nthis is aparagraph \n<pre>this is some code</pre>\n[link to google](https://www.google.com)\n</br><img src="https://via.placeholder.com/150" class="rounded">`,
    likes: 100,
    dislikes: 10
  },
  {
    _id: "10",
    username: "john doe",
    date: "1-1-2001",
    category_id: "1",
    title: "Title",
    tags: ["t1", "t2", "t3", "t4"],
    content: `# hello there \nthis is aparagraph \n<pre>this is some code</pre>\n[link to google](https://www.google.com)\n</br><img src="https://via.placeholder.com/150" class="rounded">`,
    likes: 100,
    dislikes: 10
  }
];

const miniPosts = [
  {
    _id: "2315",
    username: "john doe",
    date: "1-1-2001",
    category_id: "1",
    title: "Title"
  }
];

export function getMiniPosts() {
  return miniPosts;
}

export function getSearchResults(queru) {
  return miniPosts;
}

export function getPost(id) {
  // return posts.find(p => p._id === id);
  return http.get(`/getpost/${id}`);
}

export function getDummyPost(id) {
  return http.get(`/getpost/${id}`);
}
