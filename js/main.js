console.log('Hej', $);

var webshopid = 32523; //22222, 47675, 11011, 32523, 43309, 32208

var api = new $.JsonRpcClient({
    ajaxUrl: 'https://shop.textalk.se/backend/jsonrpc/v1/?webshop=' + webshopid
});

function apicall(method, params, cb) {
    api.call(
        method,
        params,
        function(data) {
            cb(data);
        },
        function(error) {
            handleError(error);
        }
    );
}

var query = {
    "uid": true,
    "name": true,
    "children": true,
    "parent": true
};
var selection = {
    "filters": {
        "empty": {
            "equals": false
        }
    },
};

function handleError(error) {
    console.error(error);
}


apicall('Articlegroup.tree', [null, query, selection], function(result) {
    console.log(result);

    /**************** Headingggs and subheadnings ***************/

    function trave(result) {
        var jake = 0;
        result.forEach(function(item) {
            var kaka;
            if (item.parent) {
                kaka = '<li class="submenuitem mop" data-uid="' + item.uid + '">' + item.name.sv + '</li>';
            } else {
                kaka = '<li class="menuitem mop ni" id="nip' + jake + '" data-uid="' + item.uid + '">' + item.name.sv + '</li>';
                jake++;
            }
            $('.menu').append(kaka);
            trave(item.children);
        });
    }
    trave(result);

    /********* Click ant takes id*********/
    $(".mop").bind('click', function() {
        document.getElementById('articleBar').innerHTML = '';
        $("div").remove('#marsipan');
        clickedArticleGroup($(this));
    });
    /*****************************/

    function clickedArticleGroup(those) {
        renderArticleList(those.data('uid'));
    }
});

//////////////
// Articlar //
//////////////

function renderArticleList(articlegroupsuid) {
    console.log('Ska visa artiklar från artikelgrupp', articlegroupsuid);

    var query = {
        "uid": true,
        "name": true,
        "price": true,
        "images": true,
        "description": true
    };
    var selection = {
        filters: {
            '/articlegroup': { in : [articlegroupsuid]
            }
        }
    };

    apicall('Article.list', [query, selection], function(result) {
        console.log('Got articles', result);

        /********** Empty tabel ***********/
        var table = document.getElementById("articleBar");
        var id = 0;
        for (var b = 0; b < (result.length / 3); b++) {
            var Arrow = document.createElement("div");
            Arrow.className = "row";
            Arrow.id = "row" + b;
            document.getElementById('articleBar').appendChild(Arrow);
            for (var j = 0; j < 3; j++) {
                var Arcol = document.createElement("div");
                Arcol.className = "col-md-4";
                Arcol.id = "plic" + id;
                //console.log("plic är: plic" + id);
                id++;
                document.getElementById("row" + b).appendChild(Arcol);
            }
        }
        /********* articles and pictures shown ***********/
        for (var i = 0; i < result.length; i++) {
            var art = result[i];

            /***** if there is a price difference from normal *****/
            var prisReg = art.price.regular.SEK;
            var regularPriceDiv = '';
            if (art.price.regular.SEK != art.price.current.SEK) {
                regularPriceDiv = prisReg + " kr";
            }
            /**********/
            var Badum = document.createElement("div");
            var readMoreBut = '<a class="babon" id="' + i + '" onclick="exim(this.id)" href="javascript:void(0)">Läs mer...</a>';
            var text1 = '<div class="hodor" id="hodor' + i + '"> ' + art.description.sv + '</div><br>';
            var images1 = '<div class="imageS" id="imageS' + i + '"></div>';
            var price1 = '<p class="price">' + art.price.current.SEK + ' Kr<p class="regPrice">' + regularPriceDiv + '</p></p><br>';
            var name1 = '<a href="javascript:void(0)" onclick="artPage(' + art.uid + ')">' + art.name.sv + '</a>' + price1 + images1 + text1 + readMoreBut;
            Badum.innerHTML = '<li class="bestis bo" id="expo' + i + '" data-uid="' + art.uid + '">' + name1 + '</li>';
            document.getElementById("plic" + i).appendChild(Badum);

            /******* Pictures *******/
            var tuk;
            if (art.images.length < 3) {
                tuk = art.images.length;
            } else {
               tuk = 3;
            }
            for (var y = 0; y < tuk; y++) {
                var rex = art.images[y];
                var imgS = document.createElement("div");
                var imgLoop = '<div class="crop"><img class="ImgSiz" src="' + rex + '" /></div>';
                imgS.innerHTML = '<a href="javascript:void(0)" onclick="artPage(' + art.uid + ')">' + imgLoop + '</a>';
                document.getElementById('imageS' + i).appendChild(imgS);
            }
        }
    });
}

/******** Expand text **********/
function exim(id) {
    var dummy = "#hodor" + id;
    $(dummy).toggleClass("expand hodor");
    var ex = "#expo" + id;
    $(ex).toggleClass("bo to");
    $("#" + id).removeClass('babon').addClass('hide');

    /******* Mouseout of article highlight *********/
    $(document).mouseup(function(e) {
        var container = $(ex);
        if (!container.is(e.target)) {
            //container.hide();
            $(ex).removeClass('to').addClass('bo');
            $(dummy).removeClass('expand').addClass('hodor');
            $("#" + id).removeClass('hide').addClass('babon');

        }
    });
}

/************ Menu change ***************/
function toggleVisibility() {
    var e = document.getElementById("goTo");
    if (e.style.display == 'block') {
        changeName();
        e.style.display = 'none';
    } else {
        e.style.display = 'block';
    }
}

function changeName() {
    document.getElementById("menuBut").innerHTML = "Categories";
}

/********* Click outside of menu **********/
$(document).mouseup(function(e) {
    var container = $("#goTo");
    if (!container.is(e.target)) {
        container.hide();
        changeName();
    }
});
/*****************************************/

$("#bapido").mouseenter(function() {
        $('.firstU').children().css('display', 'block');
    }).mouseleave(function() {
        $('.A').css('display', 'none');
    });

    /******* start articles *******/
        console.log('Ska visa utvalda varor ');

        var query = {
            "uid": true,
            "name": {sv: true},
            "price": true,
            "images": true,
            "description": true
        };
        var selection = {
          sort: 'created',
          descending: true,
          limit: 3
        };

        apicall('Article.list', [query, selection], function(resultm) {
            console.log('Got article origami:', resultm);

            for(var i = 0; i <= resultm.length - 1; i++) {
            //  console.log("Så det går så här: " , resultm[i].name.sv);
              var dump = resultm[i];
              /***** if there is a price difference from normal *****/
              var prisReg = dump.price.regular.SEK;
              var regularPriceDiv = '';
              if (dump.price.regular.SEK != dump.price.current.SEK) {
                  regularPriceDiv = prisReg + " kr";
              }
              /**********/
              var Badum = document.createElement("div");
              var readMoreBut = '<a class="babon" id="' + i + '" onclick="exim(this.id)" href="javascript:void(0)">Läs mer...</a>';
              var text1 = '<div class="hodor" id="hodor' + i + '"> ' + dump.description.sv + '</div><br>';
              var images1 = '<div class="imageS" id="imageS' + i + '"></div>';
              var price1 = '<p class="price">' + dump.price.current.SEK + ' Kr<p class="regPrice">' + regularPriceDiv + '</p></p><br>';
              var name1 = '<a href="javascript:void(0)" onclick="artPage(' + dump.uid + ')">' + dump.name.sv + '</a>' + price1 + images1 + text1 + readMoreBut;
              Badum.innerHTML = '<div class="col-md-4"><li class="bestis bo" id="expo' + i + '" data-uid="' + dump.uid + '">' + name1 + '</li></div>';
              document.getElementById("StartArt").appendChild(Badum);

              /******* Pictures *******/
              var tuk;
              if (dump.images.length < 3) {
                  tuk = dump.images.length;
              } else {
                 tuk = 3;
              }
              for (var y = 0; y < tuk; y++) {
                  var rex = dump.images[y];
                  var imgS = document.createElement("div");
                  var imgLoop = '<div class="crop"><img class="ImgSiz" src="' + rex + '" /></div>';
                  imgS.innerHTML = '<a href="javascript:void(0)" onclick="artPage(' + dump.uid + ')">' + imgLoop + '</a>';
                  document.getElementById('imageS' + i).appendChild(imgS);
              }
          }

          },function(error) {console.log(error);
        });
/* --------------------------------------------- */
