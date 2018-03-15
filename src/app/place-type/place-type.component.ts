import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-place-type',
  templateUrl: './place-type.component.html',
  styleUrls: ['./place-type.component.css']
})
export class PlaceTypeComponent implements OnInit {

  constructor(private http: HttpClient,public snackBar: MatSnackBar) { }

  myControl: FormControl = new FormControl();
  selected: any = "";
  enable: boolean = true;
  type: any = "";
  keyword: any = "";
  radius: number = 2;
  websites:any="";
  meter: number = 1000;
  a:boolean=false;
  //lat:number=73.764954;
  //long:number=15.533414;
  lat: number = null;
  long: number = null;
  result: any;
  upon:boolean=false;
  message: any = "";
  access_token: any = '318582794937832|d5ca8818c285970319593daa35097f77';
  access_token2: any = "AIzaSyAXeuPblW5FFpupnbNPG-MTbfGxgpzaH1A";
  dataFrom: any = "facebook";
  spin: boolean = false;
  acc: boolean = false;
  sorts: any = ['Checkins', 'Rating', 'Proximity'];
  sortby: any = "Checkins";
  paging: any = null;
  resultint: any = null;
  showradius:boolean=false;
  facebookFields: any = "restaurant_specialties,restaurant_services,website,engagement,phone,single_line_address,PagePhotos,name,checkins,picture,description,about,location,overall_star_rating,photos";
 debug:boolean=true;
 setloc:boolean=false;
  naviagteTo(lat, long) {
    let url = "https://www.google.com/maps?daddr=" + lat + "," + long;
    window.open(url);
  }




setType(str){
  this.type=str.tab.textLabel;
  if(this.debug==true){console.log(str.tab.textLabel);}
}
  enableButton(str) {
    if (str != "") {
      this.enable = false;
    }
    else {
      this.enable = true;
    }
  }
  show: boolean = true;
  readMore(str) {
    if(this.debug==true){console.log(str);}
    this.show = false;
    document.getElementById(str).style.height = "";
  }
  readLess(str) {
    if(this.debug==true){console.log(str);}
    this.show = true;
    document.getElementById(str).style.height = "100px";
  }

  enableSearch(str) {
    if (this.lat == null) {
    //  this.getLocation();
    }
    if (str != "") {
      if (this.lat != null && this.long != null) {
        this.enable = false;
        str = str.replace(/\s+/g, '_').toLowerCase();
        if (this.dataFrom == "facebook") {
          this.search(str);
        } else {
          this.search2(str);
        }
        this.message = "";
      }
      else {
        this.message = "Please wait while we get your current coordinates";
        this.openSnackBar(this.message,"");
      }
    }
    else {
      this.enable = true;
    }

  }

  openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}
  //https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=YOUR_API_KEY
  //https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA2Wlb0YpiPg9nfO3xj2OKg6vpteGgmDcZQmeJ8XTVi4Crgp0VIb0EerQS0p9lJoSGTV7GKqHxstE-1lb0fXYmfUUwQ92wfDbF6tpnlRY68Sw4BK0a3fQKIO4BeBJ0PPesEhAjbrA1oCaoaot2MmkpITl-GhQnGrgkZpz07bPbkPxIpGE2Qh9iUA&key=AIzaSyAXeuPblW5FFpupnbNPG-MTbfGxgpzaH1A
  //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=15.533414,73.764954&radius=20000&type=airport&keyword=airport&key=AIzaSyAXeuPblW5FFpupnbNPG-MTbfGxgpzaH1A
  //https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyAXeuPblW5FFpupnbNPG-MTbfGxgpzaH1A
  //https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAOc3nIokmY84WosYzSAvis8R2XhMHCiBF1NlecuT7pK4X93qjoA1M-NS6DGGJq2YpSqcU4l1UOiXnrsvxu2fwE8Fc-CIDPmPigWxD0L2DEAPhU0e0Q7xQJ0xHGtnSGYFTEhBATg07pmKWRP3Xx5qbN8gSGhSLTHLIGucSMARtrGwscLLbNi6RJA&key=AIzaSyAXeuPblW5FFpupnbNPG-MTbfGxgpzaH1A
  //https://maps.googleapis.com/maps/api/place/details/json?placeid=12cf531c7fd9d30815e34fbd19351d8407dd78db&key=AIzaSyAXeuPblW5FFpupnbNPG-MTbfGxgpzaH1A

  accCheck(str) {
    if (str==false) {
      if(this.debug==true){console.log("googling");}
      this.dataFrom = "google";
      this.enableSearch(this.type);
    }
    else {
      this.dataFrom = "facebook";
      this.enableSearch(this.type);

    }
  }

  result2: any = "";

  search2(str) {

    this.updatePosition();

    str = str.replace(/\s+/g, '_').toLowerCase();
    this.spin = true;
    this.meter = null;
    this.meter = this.radius * 1000;
    let tp = null;
    if (str == "Nearby Places") {
      tp = "";
    }
    else {
      tp = str;
    }
    if (str == "nearby_places") {
      tp = "";
    }
    else {
      tp = str;
    }
     tp = tp.replace("_", "");

    //this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=15.533414,73.764954&radius=20000&type=restaurant&keyword=&key=AIzaSyAXeuPblW5FFpupnbNPG-MTbfGxgpzaH1A').subscribe(data => {
    // this.http.get('http://silkemporiumgoa.com/map/map.php?type='+this.type+'&keyword='+this.keyword+'&long='+this.long+'&lat='+this.lat+'&radius='+this.meter).subscribe(data => {
    this.http.get('https://u5tyzkuuqi.execute-api.ap-south-1.amazonaws.com/prod/placesAPI?type=' +''+ '&key=' + tp + '&long=' + this.long + '&lat=' + this.lat + '&radius=' + this.meter + '&token=null').subscribe(data => {
      this.result2 = data['results'];
      this.paging=null;
      this.paging = data['next_page_token'];
      this.spin = false;

      if (data['status'] == "ZERO_RESULTS") {
        this.message = "No Result Found. Try Changing search radius or keyword";
        this.showradius=true;
        this.openSnackBar(this.message,"");


      }else{
        this.message="Showing "+this.result2.length+" Results Within "+this.radius+" KM of Radius via Google Search";
        this.showradius=false;
        this.openSnackBar(this.message,"");

      }
    });
  }

  sortIt(str,str2){
    if (str == "Rating") {
      this.result.sort(function(a, b) { return b.overall_star_rating - a.overall_star_rating });

    }
    else {
      if (str == "Proximity") {
        this.result.sort(function(a, b) { return Math.abs(str2 - b.location.latitude);});

      }
      else {
        if (str == "Checkins") {
          this.result.sort(function(a, b) { return b.checkins - a.checkins });
        }

        else {
          this.result.sort(function(a, b) { return b.checkins - a.checkins });

        }
      }
    }
  }
  websitesList(str){
  var res = str.split(" ");
  var arrayLength = res.length;
  var reso="";
  for (var i = 0; i < arrayLength; i++) {
    //  alert(res[i]);
    if(!(/^http/.test(res[i])))
{
    res[i] = "http://" + res[i];
}
    reso=reso+"<a href='"+res[i]+"' class='mid' [ngStyle]=\"{'display':'block','text-align':'center'}\"  target='_blank'>"+res[i]+"</a><br>";
  }

  //  str = str.replace(/\s+/g, '">"</a><br><a href="').toLowerCase();

return reso;

  }

  search(str) {

    this.updatePosition();
    str = str.replace(/\s+/g, '_').toLowerCase();
    this.meter = null;
    this.meter = this.radius * 1000;
    this.spin = true;
    let tp = null;
    if (this.type == "Nearby Places") {
      tp = "";
    }
    else {
      tp = this.type;
    }
    //  this.http.get('http://localhost/payu/map.php?type='+this.type+'&keyword='+this.type+'&long='+this.long+'&lat='+this.lat+'&radius='+this.radius).subscribe(data => {
    this.http.get('https://graph.facebook.com/v2.11/search?type=place&q=' + tp + '&center=' + this.lat + ',' + this.long + '&distance=' + this.meter + '&fields=' + this.facebookFields + '&access_token=' + this.access_token).subscribe(data => {
      this.result = data['data'];
      this.paging=null;
console.log("this.result.length"+this.result.length);
      if (this.result.length==0){
        this.message="No Result Found Within "+this.radius+" KM of Radius";
        this.showradius=true;
        this.openSnackBar(this.message,"");

      }
    else{

    }
      try{

      this.paging = data['paging']['next'];
    }catch(e){}
      this.spin = false;

      for (let i = 0; i < this.result.length; i++) {
        let sub = Math.abs(this.result[i].location.latitude*100) - Math.abs(this.lat*100);
        sub = Math.abs(sub);
        let sub2 = Math.abs(this.result[i].location.longitude*100) - Math.abs(this.long*100);
        sub2 = Math.abs(sub2);
      if(this.debug==true){console.log(sub+sub2);}
        if (((sub + sub2) > 10)) {
          if(this.radius<=2){

          if(this.debug==true){console.log(this.result[i].name);}
          this.result.splice(i, 1);
          if(this.debug==true){console.log("REMOVED" + this.result[i].location.longitude + "," + this.result[i].location.latitude);}
        }}
        else {
          if(this.debug==true){console.log("Kept" + this.result[i].location.longitude + "," + this.result[i].location.latitude);}
        }
      }
      if (this.result.length >=1 ) {

      this.message="Showing "+this.result.length+" Results Within "+this.radius+" KM of Radius via Facebook Search";
            this.showradius=false;
            this.openSnackBar(this.message,"");

          }
          else{

          }
      if (this.sortby == "Rating") {
        this.result.sort(function(a, b) { return b.overall_star_rating - a.overall_star_rating });

      }
      else {
        if (this.sortby == "Proximity") {
          this.result.sort(function(a, b) { return b.location.latitude - this.lat });

        }
        else {
          if (this.sortby == "Checkins") {
            this.result.sort(function(a, b) { return b.checkins - a.checkins });
          }

          else {
            this.result.sort(function(a, b) { return b.checkins - a.checkins });

          }
        }
      }


    });

  }

  gotoNext2(str) {

    this.http.get('https://u5tyzkuuqi.execute-api.ap-south-1.amazonaws.com/prod/placesAPI?token=' + str).subscribe(data => {
      this.result2 = this.result2.concat(data['results']);
      //   this.result2 = data['results'];
      this.paging=null;
      this.paging = data['next_page_token'];
      this.spin = false;

      if (data['status'] == "ZERO_RESULTS") {
        this.message="<p>No Result Found Within "+this.radius+" KM of Radius</p><br><p>Increase the search radius and try again</p>";
        this.showradius=true;
        this.openSnackBar(this.message,"");


      }else{
        this.message="Showing "+this.result2.length+" Results Within "+this.radius+" KM of Radius via Google Search";
        this.showradius=false;
        this.openSnackBar(this.message,"");


      }
    });
  }
  gotoNext(str) {
    if(this.debug==true){console.log(str);}
    this.http.get(str).subscribe(data => {
      this.resultint = data['data'];
      this.paging=null;
      try{
      this.paging = data['paging']['next'];}
      catch(e){}
      this.spin = false;

      for (let i = 0; i < this.resultint.length; i++) {
        let sub = Math.abs(this.resultint[i].location.latitude) - Math.abs(this.lat);
        sub = Math.abs(sub);
        let sub2 = Math.abs(this.resultint[i].location.longitude) - Math.abs(this.long);
        sub2 = Math.abs(sub2);
        if (((sub + sub2) > 1)) {
          if(this.radius<=2){
          if(this.debug==true){console.log(this.resultint);}
          this.resultint.splice(i, 1);
          if(this.debug==true){console.log(this.resultint);}
          if(this.debug==true){console.log("REMOVED" + this.resultint[i].location.longitude + "," + this.resultint[i].location.latitude);}
      }  }
        else {
          if(this.debug==true){console.log("Kept" + this.resultint[i].location.longitude + "," + this.resultint[i].location.latitude);}
        }
      }
      this.result = this.result.concat(this.resultint);
      this.message="Showing "+this.result.length+" Results Within "+this.radius+" KM of Radius via Facebook Search";
      this.showradius=true;
      this.openSnackBar(this.message,"");


      if(this.debug==true){console.log(this.result);}
      if (data['status'] == "ZERO_RESULTS") {
        this.message = "No Result Found. Try Changing search radius or keyword";
        this.showradius=true;
        this.openSnackBar(this.message,"");

      }else{
        this.showradius=false;

      }
    });
    if(this.debug==true){console.log(str);}
  }
  showImages(str) {
    if(this.debug==true){console.log("showImages");}
    if (str != null) {
      try {
        let arrayLength = this.result[str].photos.data.length;
        for (let i = 0; i < arrayLength; i++) {
          if(this.debug==true){console.log(this.result[str].photos.data[i].id);}
          if (document.getElementById(this.result[str].photos.data[i].id).getAttribute('src') == null) {
            this.showPhoto(this.result[str].photos.data[i].id);
            if(this.debug==true){console.log("setting src" + this.result[str].photos.data[i].id);}
          }
        }
      }
      catch{}
    }
  }
  showImages2(str, str2) {
    str2 = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + str2 + "&key=" + this.access_token2;
    if(this.debug==true){console.log(str + "," + str2);}

    document.getElementById(str).setAttribute('src', str2);
  }
  showPhoto(str) {
    if(this.debug==true){console.log("showPhoto" + str);}
    if (str != null) {
      this.http.get('https://graph.facebook.com/v2.11/' + str + '?fields=width,height,picture,link,images,comments,likes&access_token=' + this.access_token).subscribe(data => {
        let qua = data['images'].length;
        if (qua > 2) {
          qua = qua / 2;
          qua = Math.round(qua);
        }
        else {
          qua = qua - 1;
        }
        document.getElementById(str).setAttribute('src', data['images'][qua]['source']);
        document.getElementById(str).setAttribute('width', '100%');
      });
    }
  }


  public options = ['Nearby Places', 'Restaurant', 'Cafe', 'ATM', 'Beaches', 'Petrol Pump', 'Police', 'art_gallery', 'bakery', 'bank', 'bar', 'beauty_salon', 'bicycle_store', 'book_store', 'bowling_alley', 'bus_station', 'campground', 'car_dealer', 'car_rental', 'car_repair', 'car_wash', 'casino', 'cemetery', 'church', 'city_hall', 'clothing_store', 'convenience_store', 'courthouse', 'dentist', 'department_store', 'doctor', 'electrician', 'electronics_store', 'embassy', 'fire_station', 'florist', 'funeral_home', 'furniture_store', 'gas_station', 'gym', 'hair_care', 'hardware_store', 'hindu_temple', 'home_goods_store', 'hospital', 'insurance_agency', 'jewelry_store', 'laundry', 'lawyer', 'library', 'liquor_store', 'local_government_office', 'locksmith', 'lodging', 'meal_delivery', 'meal_takeaway', 'mosque', 'movie_rental', 'movie_theater', 'moving_company', 'museum', 'night_club', 'painter', 'park', 'parking', 'pet_store', 'pharmacy', 'physiotherapist', 'plumber', 'post_office', 'real_estate_agency', 'roofing_contractor', 'rv_park', 'school', 'shoe_store', 'shopping_mall', 'spa', 'stadium', 'storage', 'store', 'subway_station', 'supermarket', 'synagogue', 'taxi_stand', 'train_station', 'transit_station', 'travel_agency', 'veterinary_care', 'zoo'];



  filteredOptions: Observable<string[]>;
  location: any;
  webview:any=false;
  set:any=false;

  ngOnInit() {

//    this.getLocation();
let url_string = window.location.href; //window.location.href
let url = new URL(url_string);
 this.webview = url.searchParams.get("webview");
 this.set = url.searchParams.get("set");

 if(url.searchParams.get("set")=="true"){
   if(this.debug==true){console.log("set");}

 if(url.searchParams.get("lat")){
   this.lat=parseFloat(url.searchParams.get("lat"));
 }
 if(url.searchParams.get("long")){
   this.long=parseFloat(url.searchParams.get("long"));
 }}

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        if (this.message != "") {
          if (this.dataFrom == "facebook") {
            this.search(this.type);
          }
          else {
            this.search2(this.type);
          }
        }
        else{
          this.search(this.type);

        }
        if(this.debug==true){console.log(position.coords);}
      });
    }
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
      startWith(''),
      map(val => this.filter(val))
      );
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      if(this.debug==true){console.log("geo location");}
      this.message = "getting latitude longitude";
      this.openSnackBar(this.message,"");

    } else {
    }
  }
  showShortCoord(str1,str2){
return     parseFloat(str1).toFixed(4)+","+parseFloat(str2).toFixed(4)
  }
updatePosition(){
  if(this.setloc==false){
this.upon=true;
  navigator.geolocation.getCurrentPosition(position => {
    this.location = position.coords;
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;
    this.showShortCoord(this.lat,this.long);
    this.upon=false;
    if(this.debug==true){console.log(position.coords);}
  });
}
}
  showPosition(position) {
    if(this.debug==true){console.log("geo location SHOW");}
    //   this.long=position.coords.longitude;
    // this.lat=position.coords.latitude;
    navigator.geolocation.getCurrentPosition(position => {
      this.location = position.coords;
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      if(this.debug==true){console.log(position.coords);}
    });
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }


}
