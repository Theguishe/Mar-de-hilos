import React from "react";
import { Carousel } from "react-carousel-minimal";

function Carrusel() {
    const data = [
        {
            image:
                ""
        },
        {
            image:
                "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg"
        },
        {
            image:
                "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg"
        },
        {
            image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg"
        },
        {
            image:
                "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg"
        },
        {
            image:
                "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg"
        },
        {
            image:
                "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx"
        },
        {
            image:
                "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg"
        },
        {
            image:
                "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg"
        }
    ];

    return (
        <div >
            <div>
                <div className=" pt-10">
                    <Carousel
                        //llamado de los datos
                        data={data}
                        // tiempo de duracion
                        time={4000}
                        //propiedades de tamaño
                        width="5000px"
                        height="800px"
                        radius="0px"
                        //numero de imagenes
                        slideNumber={true}
                        //si es o no automatico
                        automatic={true}
                        //circulos de imagen
                        dots={true}
                        //imagenes disponibles en pequeño
                        thumbnails={false}
                        thumbnailWidth="100px"
                    />
                </div>
            </div>
        </div>
    );
}

export default Carrusel;