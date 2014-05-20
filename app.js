(function (angular) {

    var app = angular.module("GridApp", []);

    app.filter("breakAt", function () {
        return function (List, Size, Name) {

            var i = 0;
            var Total = 0;
            var NewList = [];
            var NewGroup = [];
            var Max = List.length;

            while (NewList.length <= Max) {

                if (i >= Max)
                    break;

                var Item = List[i];
                var ItemSize = +Item[Name];
                var NextItem = List[i + 1];

                if (Total === 0) {
                    NewGroup = [];
                }

                if (Total < Size) {

                    i++;
                    Total += ItemSize;
                    NewGroup.push(angular.copy(Item));

                    if (NextItem) {
                        Total += +NextItem[Name];
                    }
                }

                if (Total >= Size) {

                    NewList.push(angular.copy(NewGroup));
                    Total = 0;
                }

            }

            return NewList;
        };
    });

    app.controller("GridController", function ($scope, $filter) {

        var rows = [];
        for (var i = 1; i <= 15; i++) {
            rows.push({
                id: i,
                size: Math.floor(Math.random() * 12) + 1 
            });
        }

        $scope.groups = $filter("breakAt")(rows, 12, 'size');

    });

})(angular);