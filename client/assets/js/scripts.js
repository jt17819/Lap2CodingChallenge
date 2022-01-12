let url = window.location.href;
if(url.includes('#')) {
    const id = url.split('#').pop(); 
    renderPost(id);
} else {
    let form = document.getElementById('postForm');
    form.addEventListener('submit', testData)//postData)
}

async function postData(e) {
    e.preventDefault();
    const postData = {
        title: e.target.postTitle.value,
        author: e.target.postAuthor.value,
        content: e.target.postContent.value
    };
    
    const options = { 
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
    };

    const response = await fetch('http://localhost:3000/', options)
    const json = await response.json()

    window.location.replace(`/#the-id`); //!!!
    location.reload();
};

async function getData(id) {
    const data = await fetch(`http://localhost:3000/${id}`) //!!!
    const json = await data.json()
    return json
}

async function renderPost(id) {
    const section = document.getElementById('main-content');
    section.textContent = ''
    // let postData = await getData(id)
    // postData = postData.post
    postData = id

    const post = document.createElement('div')
    const postTitle = document.createElement('h1')

    const postMeta = document.createElement('address')
    const postAuthor = document.createElement('a')

    const postContent = document.createElement('p')

    post.classList.add('container')


    postTitle.textContent = postData.title
    postAuthor.textContent = postData.author
    postAuthor.rel = 'Author'
    postContent.textContent = postData.content

    postMeta.append(postAuthor)

    post.appendChild(postTitle)
    post.appendChild(postMeta)
    post.appendChild(postContent)

    section.appendChild(post)
    
}

function testData() {
    posts = {title: 'Hello', author: 'Me', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
    renderPost(posts)
    return
}
