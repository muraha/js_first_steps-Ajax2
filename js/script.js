let ctry = $('#country');
let city = $('#city');



$.ajax({
    url: 'data.json',
    dataType: 'json',
    type: 'GET',
    success: function (data) {
        ctry.append(`<option value="0"></option>`);

        // for (let i = 0; i < data.length; i++) {
        //     ctry.append(`<option value="${data[i]["country name"]}">${data[i]["country name"]}</option>`)
        // }

        // OR 
        data.forEach(function (c) {
            ctry.append(`<option value="${c["country name"]}">${c["country name"]}</option>`)
        })
    },
    errror: function () {
        console.log('error T_T')
    }
})

ctry.on('change', function () {
    //clear all cities data
    while (city[0].childNodes[0]) {
        city[0].removeChild(city[0].childNodes[0]);
    };

    //populate with new cities
    $.ajax({
        url: 'data.json',
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            let value = ctry.val();
            //find object by selected country in #ctry dropdown
            // let obj = data.find(c => ["country name"] === value)
            let obj = data.find(function (c) {
                return c["country name"] === value;
            });
            city.append(`<option></option>`); //add an empty element

            // // create an array cities with all cities in obj
            // // let cities = obj["delivery points"].map(p => p.city)
            // // 
            // // let cities = obj["delivery points"].map(function (p) {
            // //     return p.city;
            // // });

            // let cities1 = [];
            // let cities2 = [];
            // obj["delivery points"].forEach(function (p) {
            //     p["has delivery point"] ? cities1.push(p.city) : cities2.push(p.city)
            // });

            // //populate #city dropdown
            // // cities.forEach(c => city.append(`<option value="${c}">${c}</option>`));
            // //
            // // cities.forEach(function (c) {
            // //     return city.append(`<option value="${c}">${c}</option>`)
            // // });

            // cities1.forEach(function (c) {
            //     city.append(`<option value="${c}">${c}</option>`)
            // });
            // cities2.forEach(function (c) {
            //     city.append(`<option value="${c}" disabled>${c}</option>`)
            // });

            obj["delivery points"]
                .sort((p1, p2) => p2["has delivery point"] - p1["has delivery point"])
                .forEach(function (p) {
                    let c = p.city;
                    if (p["has delivery point"]) {
                        city.append(`<option value="${c}">${c}</option>`)
                    } else {
                        city.append(`<option value="${c}" disabled>${c}</option>`)
                    }
                });

        },
        errror: function () {
            console.log('error T_T')
        }
    })
})