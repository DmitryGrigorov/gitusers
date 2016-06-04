$(document).ready(function(){
    
     var url = 'https://api.github.com/search/users?q=',
        page = '&page=',
        numberOfPage = 1,
        sort = '&sort=asc',
        perPage = '&per_page=10';
    
    function userBlock(url, imgURL, login){
        var img = imgURL;
        return '<a href="' + url + '" target="_blank">' +
                            '<div class="thumbnail user">' +
                                '<img class="img-thumbnail" src="' + img + '" alt="">' +
                                '<h3 class="loginOfUser">' + login + '</h3>' +
                            '</div>' +
                        '</a>';
    }
    
    function updateButtons(selector, pressedButton, allButtons){
      
        
        console.log(pressedButton);
        
        var buttons = $(selector).find('.btn-group'),
            selectedButton = $(selector).children('.btn-primary'),
            buttonsHTML = '';
        
        buttons.html('');
        
        console.log(buttons);
            
        
        if(allButtons <= 10){
            for(var i = 1; i <= allButtons; i++){
                if(pressedButton == i){
                    buttonsHTML += ('<button class="btn btn-primary" type="button">' + i + '</button>');
                } else {
                    buttonsHTML += ('<button class="btn" type="button">' + i + '</button>');
                }
            };
        }
        if(allButtons > 10){
            
            if (pressedButton <= 3) {
                
                for(var i = 1; i <= 4; i++){
                    if(pressedButton == i){
                    buttonsHTML += ('<button class="btn btn-primary" type="button">' + i + '</button>');
                    } else {
                        buttonsHTML += ('<button class="btn" type="button">' + i + '</button>');
                    }
                }
                
                buttonsHTML += ('<button class="btn" type="button" disabled>' + '...' + '</button>');
                buttonsHTML += ('<button class="btn" type="button">' + allButtons + '</button>');
            } else if(pressedButton > 3 && pressedButton < (parseInt(allButtons) - 2) ){
             
                buttonsHTML += ('<button class="btn" type="button">' + 1 + '</button>');
                buttonsHTML += ('<button class="btn" type="button" disabled>' + '...' + '</button>');
                for(var i = parseInt(pressedButton) - 2; i <= parseInt(pressedButton) + 1 ; i++){
                    if(pressedButton == i){
                    buttonsHTML += ('<button class="btn btn-primary" type="button">' + i + '</button>');
                    } else {
                        buttonsHTML += ('<button class="btn" type="button">' + i + '</button>');
                    }
                }
                buttonsHTML += ('<button class="btn" type="button" disabled>' + '...' + '</button>');
                buttonsHTML += ('<button class="btn" type="button">' + allButtons + '</button>');
                
            } else if(pressedButton == allButtons) {
                buttonsHTML += ('<button class="btn" type="button">' + 1 + '</button>');
                buttonsHTML += ('<button class="btn" type="button" disabled>' + '...' + '</button>');
                for(var i = parseInt(pressedButton) - 3; i <= parseInt(pressedButton); i++){
                    if(pressedButton == i){
                    buttonsHTML += ('<button class="btn btn-primary" type="button">' + i + '</button>');
                    } else {
                        buttonsHTML += ('<button class="btn" type="button">' + i + '</button>');
                    }
                };
            } else if(pressedButton == allButtons || pressedButton >= parseInt(allButtons)- 4){

                buttonsHTML += ('<button class="btn" type="button">' + 1 + '</button>');
                buttonsHTML += ('<button class="btn" type="button" disabled>' + '...' + '</button>');

                for(var i = allButtons - 4; i <= allButtons; i++){
                    if(pressedButton == i){
                    buttonsHTML += ('<button class="btn btn-primary" type="button">' + i + '</button>');
                    } else {
                        buttonsHTML += ('<button class="btn" type="button">' + i + '</button>');
                    }
                };
            }
        }
        
        buttons.html(buttonsHTML);
        
        
    };
    
    function searchBlock(selector){
        
        var form = $(selector).children('form');
        
        var query;
        
        form.on('submit', function(e){
            e.preventDefault();
            
            query = $(this).children('input[type=search]').val();
            
            var pages = 0;

            $.getJSON(url + query + sort + page + numberOfPage + perPage, function(json) {

                pages = (json.total_count % 10 > 0) ? parseInt(json.total_count / 10) + 1 : parseInt(json.total_count / 10) ;
                console.log('pages = ' + pages);
                console.log(json);
                var innerHTML = '';
                var $users = $(selector).children('.users');
                $users.html('');

                json.items.forEach(function(el){

                    innerHTML += userBlock(el.html_url, el.avatar_url, el.login);

                }); // add each user
                
                $users.html(innerHTML);
                
                updateButtons(selector, 1, pages);
            });

        });
        
        $(selector + ' .btn-group').on('click', '.btn', function(){
        
                console.log(query);        
                var numberOfButton = $(this).text();
                
                $.getJSON(url + query + sort + page + $(this).text() + perPage, function (json){
                    
                    pages = (json.total_count % 10 > 0) ? parseInt(json.total_count / 10) + 1 : parseInt(json.total_count / 10) ;

                    updateButtons( selector, numberOfButton, pages);

                    console.log(json);
                    
                    var $users = $(selector).children('.users');
                    $users.html('');

                    json.items.forEach(function(el){

                        $users.append(userBlock(el.html_url, el.avatar_url, el.login));

                    }); // add each user

                    updateButtons(selector, numberOfButton, pages);

                });

            });
        
    };
    
    searchBlock('#first-block');
    searchBlock('#second-block');
    searchBlock('#third-block');
    
    $('#first-block [type=search]').val('anaken');
    $('#second-block [type=search]').val('darth');
    $('#third-block [type=search]').val('batman');
    
    
    $('#first-block form').submit();
    $('#second-block form').submit();
    $('#third-block form').submit();
    
});