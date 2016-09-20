//= require simplecart-js/simpleCart.js
simpleCart({
    
  checkout: {
        type: "PayPal",
        email: "info@baharboutique.de"
    },
    
    currency: "EUR",
    cartColumns: [
        { view: function(item, column){
            return  '<a class="thumbnail" href="' + item.get('url') + '"><img src="' + item.get('thumb') + '" alt="' + item.get('name') + '"></a>';
          }, attr: "thumb", label: false
        } ,
        { view: function(item, column){
            return  '<p><a href="' + item.get('url') + '" class="h4">' + item.get('name') + '</a><br>' +
                    (item.get('brand') ? 'Hersteller: ' + item.get('brand') + '<br>' : '') +
                    (item.get('size') ? 'Größe: ' + item.get('size') + '<br>' : '') +
                    '</p>' +
                    '<a href="javascript:;" class="simpleCart_remove">Entfernen</a>';
          }, attr: "product", label: "Produkt"} ,
        { attr: "price" , label: "Preis", view: 'currency' } ,
        { view: function(item, column){
            return  '<a href="javascript:;" class="simpleCart_decrement">-</a> ' +
                    item.quantity() + ' ' +
                    '<a href="javascript:;" class="simpleCart_increment">+</a>';
          }, attr: "quantity", label: "Menge"
        }
    ]
});
simpleCart({
     shippingFlatRate: 5
});

//simpleCart.currency().decimal = ',';
//simpleCart.currency().delimiter = '.';
simpleCart.bind( "afterAdd" , function( item ) {
    //toastr.success( item.get("name") + (item.get("params") ? " - " + item.get("params") : '') + " - " + item.get("size") + " was added to the basket." );
    $('#cartModal').modal('show');
    /*
    setTimeout(function() {
        var quantity = simpleCart.quantity();
        toastr.info(
            "Your new sub-total is " + simpleCart.toCurrency( simpleCart.total(), {decimal: ',', delimiter: '.'} ) + " (" + quantity + " item" + (quantity !== 1 ? "s" : "") + "). &nbsp; " +
            "<a class='btn btn-primary' href='" + $('a.navbar-cart').attr('href') + "'>" +
            "<span class='fa fa-shopping-cart'></span> View basket</a>"
        );
    }, 1000);
    */
});
simpleCart.bind( "update", function(e) {
    $el = $('.navbar-cart');
    $btn = $el.find('.btn');
    $btn.css('transition', '1s ease all');
    var qty = simpleCart.quantity();
    if(qty) {
        $el.html(qty);
        $('.simpleCart_checkout').attr('disabled', false);
        $el.fadeIn('1000');
        $btn.addClass('btn-primary');
        setTimeout(function() {
            $btn.removeClass('btn-primary');
        }, 1000);
    }
    else {
        $('.simpleCart_checkout').attr('disabled', true);
        $('.navbar-cart').fadeOut('slow');
    }
});
function get_cart_count() {
    var quantity = simpleCart.quantity();
    return quantity + " item" + quantity !== 1 ? "s" : "";
}
