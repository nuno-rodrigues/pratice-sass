//console.log("main.js")

var blogPost = {
    author: 'Brandon Smith',
    title: 'A CSS Trick',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
};

function PostPage(postData) {
    return '<div class="page">' +
        '<div class="header">' +
        'Home' +
        'About' +
        'Contact' +
        '</div>' +
        '<div class="post">' +
        '<h1>' + postData.title + '</h1>' +
        '<h3>By ' + postData.author + '</h3>' +
        '<p>' + postData.body + '</p>' +
        '</div>' +
        '</div>';
}

document.querySelector('body').innerHTML = PostPage(blogPost);