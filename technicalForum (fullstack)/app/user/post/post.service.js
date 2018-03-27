(function () {
    'use strict';

    angular
        .module('myApp.post')
        .service('PostService', PostService)

    PostService.$inject = ['$q']

    /** @ngInject */
    function PostService($q) {

        this.getPosts = getPosts;
        this.createPost = createPost;
        this.getAllPosts = getAllPosts;


        function getPosts(username) {
            var posts = [];

            var rootRef = firebase.database().ref('Posts/' + username.slice(0, 5));
            return $q(function (resolve, reject) {
                return rootRef.once('value', function (snap) {
                    console.log("Mygrid", snap.val());
                    if (snap.val() === null || snap.val().length === 0) {
                        // Do nothing
                    }
                    else {
                        // postCount = snap.val().length;
                        posts = snap.val();
                    }
                    resolve(posts);
                });
            });
        }

        function createPost(Name, Post, title) {
            var id = "",
                postCount = 0,
                deferred = $q.defer();

            firebase.database().ref('Posts/' + Name).once('value').then(function (snapshot) {
                postCount = snapshot.val() === null ? 0 : snapshot.val().length;
                id = Name + '_' + postCount;
                firebase.database().ref('Posts/' + Name + '/' + postCount).set({
                    Id: id,
                    Title: title,
                    Name: Name,
                    Post: Post,
                    likes: 0,
                    dislikes: 0
                });
                deferred.resolve('Post created');
            });
            return deferred.promise;
        }

        //creating service for getting all post
        function getAllPosts() {
            var posts = [],
                deferred = $q.defer(),
                rootRef = firebase.database().ref('Posts/');
            rootRef.once('value', function (snap) {
                if (snap.val() === null || snap.val().length === 0) {
                    //do nothing
                } else {
                    deferred.resolve(snap.val());
                }
            });
            return deferred.promise;
        }
    }
}());