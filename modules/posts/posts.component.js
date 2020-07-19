angular
    .module('posts', ['postModule'])
    .component('posts', {
        templateUrl: 'modules/posts/posts.template.html',
        restrict: 'E',
        controller: function ($scope, $http, $q, PostRepository, $routeParams) {
            this.posts = [];
            this.canLoadNext = true
            this.currentPage = 1
            this.showSpinner = true
            this.pageSize = Math.max(Number($routeParams.pageSize || 1), 1);

            this.loadNext = () => {
                this.showSpinner = true
                this.loadNextPage()
            }
            this.loadNextPage = function () {
                console.log('Load page', this.currentPage)
                const filter = new PostRepositoryFilter('open', this.pageSize, this.currentPage)
                $q
                    .resolve(PostRepository.getByFilter(filter))
                    .then(results => {
                        this.posts.push(...results)
                        this.showSpinner = false
                        this.canLoadNext = results.length === this.pageSize && (this.posts.length % this.pageSize) === 0
                    })
                this.currentPage++
            }
            this.$onInit = () => {
                this.loadNext()
            }
        }
    })
;