$(document).ready(function(){
    // alert("Funcionando");
    $('button#ok').click(function(){
        $.ajax({
            url:        'teste.txt',
            datatype:   'text',
            success:    function(data){
                $('div#novo').html(data);
            }
        });
    });
});