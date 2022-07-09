function generar(cantidad) {


    var fib;
    var fib1 = 0;
    var fib2 = 1;
    var proxFib;

    if (cantidad >= 1) {

     

        for (var x = 1; x <= cantidad; x++) {

            fib = fib1;
            proxFib = fib1 + fib2;
            fib1 = fib2;
            fib2 = proxFib;
            console.log(fib)

        }

    }

    return false;

}

generar(5)

