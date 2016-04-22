/********** Lone page for article **********/
function artPage(artID) {
    console.log('Ska visa artikel', artID);
    document.getElementById('articleBar').innerHTML = '';
    $("div").remove('#marsipan');

    var query = {
        "name": true,
        "price": true,
        "images": true,
        "description": true,
        "choices": {},
        "choiceSchema": true
    };

    /*****************/
    $('#detHarDo').jsonForm({
        schema: {
            name: {
                type: 'string',
                title: 'Name',
                required: true
            },
            count: {
                type: 'number',
                title: 'Quantity'
            }
        },
        onSubmit: function(errors, values) {
            if (errors) {
                $('#res').html('<p>I beg your pardon?</p>');
            } else {
                $('#res').html('<p>Hello ' + values.name + '.' +
                    (values.age ? '<br/>You are ' + values.age + '.' : '') +
                    '</p>');
            }
        }
    });
    /*******************/
    apicall('Article.get', [artID, query], function(arti) {
        console.log('Got articles', arti);

        var PrRg = arti.price.regular.SEK;
        var RePrDiv = '';
        if (arti.price.regular.SEK != arti.price.current.SEK) {
            RePrDiv = PrRg + " kr";
        }

        var div = document.getElementById('articleBar');
        var aprikos = '<div id="butToBuy"><button>Lägg i varukorgen</button><button>Bevaka</button></div>';
        var textBox = "<p class='textBox'>" + arti.description.sv + "</p><div id='buttonSpace'></div>";
        var regularPrice = "<p class='PrRe' style='color:black;'>" + RePrDiv + "</p>";
        var currentPrice = "<p class='usPr'>" + arti.price.current.SEK + " Kr</p>" + regularPrice + aprikos + textBox;
        var Colmd2 = "<div class='col-md-6'>" + currentPrice + "</div>";
        var imgFirstPic = "<div id='firstImgPc'></div><div id='ImagePlace'></div>";
        var Colmd1 = "<div class='col-md-6'>" + imgFirstPic + "</div>";
        var row = "<div class='row'>" + Colmd1 + Colmd2 + "</div>";
        div.innerHTML = "<h1>" + arti.name.sv + "</h1>" + row;

        /***** first picture******/
        var wof = document.createElement("div");
        wof.innerHTML = "<img class='firstImgPc' src='" + arti.images[0] + "'>";
        document.getElementById('firstImgPc').appendChild(wof);
        /******** Images *******/
        if (arti.images.length > 1) {
            for (var y = 0; y < arti.images.length; y++) {
                var rex = arti.images[y];
                var imgS = document.createElement("div");
                var imgLoop2 = '<img class="imgLonePage" onclick="makeMeChange()" src="' + rex + '" />';
                imgS.innerHTML = '<div class="panoram">' + imgLoop2 + '</div>';
                document.getElementById('ImagePlace').appendChild(imgS);

                /***** buttons to buy and so on *****/
                var li3 = '<li class=""><a href="javascript:void(0)" id="TexDet3" data-toggle="tab" aria-expanded="false">Blogga</a></li>';
                var li2 = '<li class=""><a href="javascript:void(0)" id="TexDet2" data-toggle="tab" aria-expanded="false">Recensioner och omdömen</a></li>';
                var li1 = '<li class="active"><a href="javascript:void(0)" id="TexDet" data-toggle="tab" aria-expanded="true">Detaljer</a></li>';
                var ul1 = '<ul class="nav nav-tabs bror" id="tabs">' + li1 + li2 + li3 + '</ul>';
                var tank = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit tellus eget viverra congue. Integer congue tortor id molestie porttitor. Praesent consequat tempor lacus, a luctus tellus malesuada eu. Nunc dignissim dolor leo. Vivamus aliquet bibendum quam a commodo. Etiam facilisis consequat luctus. Maecenas a luctus sapien. Vestibulum feugiat mauris in eros sagittis, id condimentum orci varius. Proin elementum augue sed leo suscipit sollicitudin.';
                var infoPlace = '<br><div id="placeInfoH">' + tank + '</div>';
                document.getElementById('buttonSpace').innerHTML = '<div class="tab-wrapper">' + ul1 + '</div>' + infoPlace;
            }
        }
        /******* Info row change text ********/
        document.getElementById("TexDet").addEventListener("click", function() {
            $('#placeInfoH').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit tellus eget viverra congue. Integer congue tortor id molestie porttitor. Praesent consequat tempor lacus, a luctus tellus malesuada eu. Nunc dignissim dolor leo. Vivamus aliquet bibendum quam a commodo. Etiam facilisis consequat luctus. Maecenas a luctus sapien. Vestibulum feugiat mauris in eros sagittis, id condimentum orci varius. Proin elementum augue sed leo suscipit sollicitudin.');
        });
        document.getElementById("TexDet2").addEventListener("click", function() {
            $('#placeInfoH').text('Ut sollicitudin nunc quis rhoncus fermentum. Proin risus arcu, condimentum ac pretium eu, lobortis a dui. Mauris ullamcorper posuere luctus. Donec facilisis enim tincidunt mauris aliquet consectetur. Phasellus a erat eu arcu cursus tristique eu ac eros. Sed nec orci semper massa pulvinar dapibus. Maecenas pretium in urna ac ultrices. Nunc bibendum augue ut nulla bibendum, non sodales mauris iaculis. Vestibulum nisi neque, faucibus et bibendum sit amet, venenatis eget sapien. Vestibulum semper nisi a mattis consequat. Phasellus pretium, massa et feugiat suscipit, ipsum arcu eleifend mi, ac faucibus turpis tortor nec nisl.');
        });
        document.getElementById("TexDet3").addEventListener("click", function() {
            $('#placeInfoH').text('Fusce congue eleifend augue at laoreet. Fusce euismod diam ac nisi cursus, eget dictum purus rhoncus. Ut aliquet sem at ipsum fringilla euismod. Donec mollis mi id mollis elementum. Aliquam erat volutpat. Proin gravida turpis consectetur, convallis nulla a, vestibulum eros. Nam libero tortor, congue ac viverra vitae, rhoncus eu arcu.');
        });
    });
    /********** Click on images to change the shown image ***********/
    function makeMeChange() {
        //  document.getElementById('articleBar').innerHTML = '';
        //  $("div").remove('#marsipan');
        //  clickedArticleGroup($());
        console.log("potstias" + rex);
    }
    /*********************/
}
