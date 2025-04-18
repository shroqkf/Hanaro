// 특정 유저의 정보와 게시글 목록을 리턴하는 함수를 작성하시오.
//  - 예) 1번 유저의 정보: https://jsonplaceholder.typicode.com/users/1
//  - 예) 1번 유저의 글목록: https://jsonplaceholder.typicode.com/posts?userId=1

//   ⇒ 다음 형식으로 리턴 (format 준수!)
//   {
//     id: 유저ID,
//     name: 유저명,
//     posts: [
//        {id: 글ID, title: 글제목, body: 글내용}, {...
//     ]
//   }

const URL = "https://jsonplaceholder.typicode.com";

const jsonplaceholderFetch = (url) => fetch(url).then((res) => res.json());

const getUserInfo = (userId) => jsonplaceholderFetch(`${URL}/users/${userId}`);

const getPostInfo = (userId) =>
  jsonplaceholderFetch(`${URL}/posts?userId=${userId}`);

const getUserPosts = async (userId) => {
  //   const { id, name } = await getUserInfo(userId);
  //   const posts = await getPostInfo(userId);

  const [{ id, name }, posts] = await Promise.all([
    getUserInfo(userId),
    getPostInfo(userId),
  ]);

  return {
    id,
    name,
    posts: posts.map(({ id, title, body }) => ({ id, title, body })),
  };
};

try {
  console.log(await getUserPosts(1));
} catch (err) {
  console.error("Error: ", err);
}

