(function (angular) {

    var app = angular.module("GridApp", []);

    app.filter("breakAt", function () {
        return function (List, Size, Name) {

           	var i = 0;			
			var NewList = [];
			var NewRow;
			var Max = List.length;
			var TempSize = 0;

			while (NewList.length <= Max) {

				if (i >= Max)
					break;

				var Item = List[i];
				var ItemSize = +Item[Name];
				var NextItem = List[i + 1];

				if(TempSize === 0){
					NewRow = [];
				}

				if(TempSize <= Size)
				{
					NewRow.push(angular.copy(Item));
					TempSize += +ItemSize;
				}

				if(NextItem)
				{
					if( (TempSize + NextItem[Name])  > Size){
						TempSize = 0;
						NewList.push(angular.copy(NewRow));
					}
				}
				else
				{
					TempSize = 0;
					NewList.push(angular.copy(NewRow));
				}


				i++;

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