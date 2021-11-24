export interface Mappable {
    location: {
        lat: number,
        lng: number
    };
    markerContent(): string
} 

export class CustomMap {
    private googleMap: google.maps.Map;

    constructor(divId: string) {
        this.googleMap =  new google.maps.Map(document.getElementById(divId), {
            zoom: 1,
            center: {
                lat: 0,
                lng: 0
            }
        });
    }

    addMarker(marker: Mappable): void {
        const mappedMarker = new google.maps.Marker({ 
            map: this.googleMap, 
            position: { 
                lat: marker.location.lat, 
                lng: marker.location.lng 
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: marker.markerContent()
        });

        mappedMarker.addListener('click', () => {
            infoWindow.open(this.googleMap, mappedMarker);
        });

        mappedMarker.addListener('mouseout', () => {
            infoWindow.close();
        });
    }
   
}