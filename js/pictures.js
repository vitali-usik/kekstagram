'use strict';

var POSTS_SIZE = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var generateRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var generatePosts = function (size) {
  var posts = [];

  for (var i = 1; i < size + 1; i++) {
    posts.push({
      url: 'photos/' + i + '.jpg',
      likes: generateRandomInt(LIKES_MIN, LIKES_MAX),
      comments: COMMENTS[generateRandomInt(0, COMMENTS.length)],
      description: DESCRIPTIONS[generateRandomInt(0, DESCRIPTIONS.length)]
    });
  }

  return posts;
}

var generatePostsList = function (posts) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < posts.length; i++) {
    fragment.appendChild(generatePost(posts[i]));
  }

  return fragment;
}

var generatePost = function (post) {
  var template = document.querySelector('#picture').content.querySelector('.picture__link');
  var element = template.cloneNode(true);

  element.querySelector('.picture__img').src = post.url;
  element.querySelector('.picture__stat--likes').textContent = post.likes;
  element.querySelector('.picture__stat--comments').textContent = post.comments;

  return element;
}

var showPosts = function (fragment) {
  document.querySelector('.pictures').appendChild(fragment);
}

var showBigPicture = function (post) {
  let bigPictureSelector = document.querySelector('.big-picture');

  bigPictureSelector.querySelector('.big-picture__img').src = post.url;
  bigPictureSelector.querySelector('.likes-count').textContent = post.likes;
  bigPictureSelector.querySelector('.comments-count').textContent = post.comments;

  bigPictureSelector.classList.remove('hidden');
  bigPictureSelector.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
  bigPictureSelector.querySelector('.social__comment-count').classList.add('visually-hidden');

  bigPictureSelector.querySelector('.social__comments').appendChild(addComment());
}

var addComment = function () {
  var element = document.createElement('li');

  element.classList.add('social__comment');
  element.classList.add('social__comment--text');
  element.textContent = COMMENTS[generateRandomInt(0, COMMENTS.length)];

  var avatar = document.createElement('img');
  avatar.className = 'social__picture';
  avatar.src = 'img/avatar-' + generateRandomInt(1, 6) + '.svg';
  avatar.alt = 'Аватар комментатора фотографии.';
  avatar.width = 35;
  avatar.height = 35;
  element.insertBefore(avatar, element.firstChild);

  return element;
}

var initPictures = function () {
  var posts = generatePosts(POSTS_SIZE);
  var postsDOM = generatePostsList(posts);
  showPosts(postsDOM);
  showBigPicture(posts[0]);
}

initPictures();
