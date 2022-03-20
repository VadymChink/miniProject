let url = new URL(location.href)
let user = JSON.parse(url.searchParams.get('data'));

function userInfo(point) {
    for (let pointKey in point) {
        if (typeof point[pointKey] !== 'object') {
            let pointContainer = document.createElement('div');
            pointContainer.innerText = point[pointKey];
            pointContainer.classList.add('block')
            document.body.appendChild(pointContainer);
        } else if (typeof point[pointKey] === 'object'){
            userInfo(point[pointKey])
        }
    }
}

userInfo(user)

let btn = document.createElement('button');
btn.innerText = 'Post of current user';
btn.classList.add('btn');
document.body.appendChild(btn);

btn.onclick = function () {
    let div = document.createElement('div');
    div.classList.add('posts')
    document.body.appendChild(div);
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
        .then(value => value.json())
        .then(posts => {
            for (let post of posts) {
                let block = document.createElement('h3');
                block.innerText = post.title;
                block.classList.add('post');
                div.append(block);
                let btnPost = document.createElement('a');
                btnPost.innerText = 'post details';
                btnPost.href = `../html/post-details.html?data=${JSON.stringify(post)}`;
                btnPost.classList.add('btnPost');
                block.appendChild(btnPost);
            }
        })
    btn.disabled = true;
}



