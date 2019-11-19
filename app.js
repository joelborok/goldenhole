var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"); 
    methodOverride=require("method-override");
   //Mongoose config
   mongoose.set('useNewUrlParser', true);
   mongoose.set('useUnifiedTopology', true);
   mongoose.connect("mongodb://localhost/kolos01_app"); 

   //App config
   app.use(express.static("public"));
   app.use(express.static("img"));
   app.set("view engine","ejs");
   app.use(bodyParser.urlencoded({extended:true}));
   app.use(methodOverride("_method"));
  //------------------------------------------------------------------
  //Schema OR Mongoose model Config

  //Institute schema
    var instituteSchema=new mongoose.Schema({
	//name
	name:String,
	//imgae
	image:String,//{type:String,default:placeholder.jpg},
	//body
	body:String,
    //address
	address:String,
	//website
	website:String,
	//affliation
	affliation:{},
	//courses_offered
	 courses:{},
	//gallery
     gallery:{}
    });
    var Institute=mongoose.model("Institute",instituteSchema);

   //Counsellors Schema
   var counsellorSchema=new mongoose.Schema({
   	//name
   	name:String,
   	//image
   	image:String,
   	//designation
   	designation:String,
   	//bio_data
   	bio_data:String,
   	//email
   	email:String,
   	//Phone_no
   	phone:String
   });
   var Counsellors=mongoose.model("Counsellors",counsellorSchema);

   //Careers Schema
     //notification emails
   var notificationSchema=new mongoose.Schema({
   	//email
   	email:String,
   	//notified
   	notified:Boolean
   });
   var Notification=new mongoose.model("Notification",notificationSchema);
   
   //CareersSchema main
   var careersSchema=mongoose.Schema({
   	//first name
   	firstName:String,
   	//LastName
   	lastName:String,
   	//email
   	email:String,
   	//position
   	position:String,
   	//file
   	file:Object,
   	//notified
   	notified:Boolean
   });
   var Careers=new mongoose.model("Careers",careersSchema);

   //Contacts
   var contactSchema=mongoose.Schema({
   	//name
   	name:String,
   	//email
   	email:String,
   	//questions
   	questions:String,
   	//notified
   	notified:Boolean
   });
   var Contacts=new mongoose.model("Contacts",contactSchema);

   //Counsellings

   var counsellingSchema=new mongoose.Schema({
   	//name
   	name:String,
   	//gender
   	gender:String,
   	//dob
   	dob:String,
   	//phone no
   	phone:String,
   	//email
   	email:String,
   	//notified
   	notified:Boolean
   });
   var Counselling=new mongoose.model("Counselling",counsellingSchema);
   
   //Admissions
   var admissionsSchema=new mongoose.Schema({
   	//name
   	name:String,
   	//course preferred
   	course:String,
   	//preferred institute
   	institute:String,
   	//preffered City
   	city:String,
   	//Phone no
   	phone:String,
   	//email
   	email:String,
   	//Notified
   	notified:Boolean
   });

   var Admissions=new mongoose.model("Admissions",admissionsSchema);
  //-------------------------------------------------------------------
    //ROUTES
    
    //home
    app.get("/",function(req,res){
    	res.render("home");
    });
    //about
    app.get("/about",function(req,res){
    	res.render("about");
    });
    //counselling
    app.get("/counselling",function(req,res){
    	res.render("counselling");
    });
     app.post("/counselling",function(req,res){
        //firstName
        var name=req.body.name;
        //gender
        var gender=req.body.radio;
        console.log(req.body.radio);
        req.body.radio
        //dob
        var dob=req.body.dob;
        //phone
        var phone=req.body.phone;
        //email
        var email=req.body.email;

        
        

        var newCounselling={name:name,gender:gender,dob:dob, phone:phone,email:email,notified:false};
        Counselling.create(newCounselling,function(err,newCounsellor){
        	if(err){
             console.log("Error");
        	}else{
             res.redirect("/counselling");
        	}
        }); 
       });



    //counsellors
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    
    //Index
    app.get("/counsellors",function(req,res){
          
        Counsellors.find({},function(err,counsellors){
		if(err){
         console.log(err);
		}else{
			res.render("counsellors",{counsellors:counsellors});
		}
	    });
    });
    //New
    app.get("/counsellors/new",function(req,res){
    	res.render("newCounsellors");
    });
    //Create
    app.post("/counsellors",function(req,res){
    	//name
    	var name=req.body.name;
        //image
        var image=req.body.image;
        //designation
        var designation=req.body.designation;
        //bio_data
        var bio_data=req.body.bio_data;
        //email
        var email=req.body.email;
        //phone
        var phone=req.body.phone;

        var newCounsellor={name:name, image:image, designation:designation, bio_data:bio_data, email:email, phone:phone};
        Counsellors.create(newCounsellor,function(err,newCounsellor){
        	if(err){
             console.log("Error");
        	}else{
             res.redirect("/counsellors");
        	}
        });
    });
    //show-------
       app.get("/counsellors/:id",function(req,res){
       	Counsellors.findById(req.params.id,function(err,foundCounsellor){
       		if(err){
       			console.log("error");
       			/*res.redirect("/counsellors");*/
       		}else{
       			res.render("sub-counsellors",{counsellor:foundCounsellor});
       		}
       	});
       }) ;
    //edit--------
       app.get("/counsellors/:id/edit",function(req,res){
       	Counsellors.findById(req.params.id,function(err,foundCounsellor){
       		if(err){
              console.log("Error");
       		}else{
              res.render("editCounsellor",{counsellor:foundCounsellor});
       		}
       	});
       }); 
     
    //Update
        app.put("/counsellors/:id",function(req,res){
    	//name
    	var name=req.body.name;
        //image
        var image=req.body.image;
        //designation
        var designation=req.body.designation;
        //bio_data
        var bio_data=req.body.bio_data;
        //email
        var email=req.body.email;
        //phone
        var phone=req.body.phone;

        var newCounsellor={name:name, image:image, designation:designation, bio_data:bio_data, email:email, phone:phone};
        Counsellors.findByIdAndUpdate(req.params.id,newCounsellor,function(err,updatedCounsellor){
  	        if(err){
              console.log("Error");
  	        }else{
              res.redirect("/counsellors/"+req.params.id);
  	        }
          });
    });
     //Destroy
     app.delete("/counsellors/:id",function(req,res){
       Counsellors.findByIdAndRemove(req.params.id,function(err,deletedCounsellor){
         if(err){
          console.log("error");
         }else{
           res.redirect("/counsellors");
         }

       });

     });








    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    
    //admissions
    app.get("/admissions",function(req,res){
    	res.render("admissions");
    });
      app.post("/admissions",function(req,res){
      	//name
   	    var name=req.body.name;
   	//course preferred
   	    var course=req.body.course;
   	//preferred institute
   	    var institute=req.body.institute;
   	//preffered City
        var city=req.body.city;
   	//Phone no
   	    var phone=req.body.phone;
   	//email
   	    var email=req.body.email;
   	var newAdmissions={name:name, course:course, institute:institute, city:city, phone:phone, email:email, notified:false};
     Admissions.create(newAdmissions,function(err,data){
          if(err){
          	console.log("Error");
          }else{
          	res.redirect("/admissions");
          }
        });
      });
    //institutes
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //index--------------
    app.get("/institutes",function(req,res){
    	Institute.find({},function(err,institutes){
		if(err){
         console.log(err);
		}else{
			res.render("institutes",{institutes:institutes});
		}
	});
    });
    //new-------------
       app.get("/institutes/new",function(req,res){
       	res.render("createInstitute");
       });
    //create--------------
       app.post("/institutes",function(req,res){
        //name
	    var name=req.body.name;
	        /*console.log(name);*/
	    //image
	    var image=req.body.image;
	        /*console.log(image);*/
	    //body/description
	    var body=req.body.body;
	        /*console.log(body);*/
        //address
	    var address=req.body.address;
	        /*console.log(address);*/
	    //website
	    var website=req.body.website;
	        /*console.log(website);*/
	    //affliation
        var affliation=req.body.affliations;
            /*console.log(affliation);*/
        var affliationArray=affliation.replace(/\r\n/g,"\n").split("\n");
            /*console.log(affliationArray);*/
	    //courses
         var courses=req.body.courses;
             /*console.log(courses);*/
         var coursesArray=courses.replace(/\r\n/g,"\n").split("\n");
         
         var subjectList=[];
         for(var i=0;i<coursesArray.length;i++){

         	var subjects={
         	title:String,
         	body:String
             };
           subjects.title=coursesArray[i];
           subjects.body="";
           subjectList.push(subjects);
         }
          /*console.log(subjectList);*/
         /*console.log(coursesArray);*/
        //gallery
         var gallery=req.body.gallery;
             /*console.log(gallery);*/
         var galleryArray=gallery.replace(/\r\n/g,"\n").split("\n");
             /*console.log(galleryArray);*/ 
         //--------------
         var newInstitute={name:name,image:image,body:body,address:address,website:website,affliation:affliationArray,courses:subjectList,gallery:galleryArray};
         Institute.create(newInstitute,function(err,newlyCreated){
         	if(err){
              console.log(err);
         	}else{
              res.redirect("/institutes");
         	}
         });
       });
    //show-------
       app.get("/institutes/:id",function(req,res){
       	Institute.findById(req.params.id,function(err,foundInstitute){
       		if(err){
       			res.redirect("/institutes");
       		}else{
       			
       			res.render("sub-institutes",{institute:foundInstitute});
       		}
       	});
       }) 
    //edit--------
       app.get("/institutes/:id/edit",function(req,res){
       	Institute.findById(req.params.id,function(err,foundInstitute){
       		if(err){
              res.render("/institutes/:id");
       		}else{
              res.render("editInstitute",{institute:foundInstitute});
       		}
       	});
       }); 
    //update--------
       app.put("/institutes/:id",function(req,res){
        //name
	    var name=req.body.name;
	        /*console.log(name);*/
	    //image
	    var image=req.body.image;
	        /*console.log(image);*/
	    //body/description
	    var body=req.body.body;
	        /*console.log(body);*/
        //address
	    var address=req.body.address;
	        /*console.log(address);*/
	    //website
	    var website=req.body.website;
	        /*console.log(website);*/
	    //affliation
        var affliation=req.body.affliation;
            /*console.log(affliation);*/
        var affliationArray=affliation.replace(/\r\n|\n/g,"\n").split("\n");
            /*console.log(affliationArray);*/
	    //courses
         var courses=req.body.courses;
             /*console.log(courses);*/
         var coursesArray=courses.replace(/\r\n|\n/g,"\n").split("\n");
             /*console.log(coursesArray);*/
        //gallery
         var gallery=req.body.gallery;
             /*console.log(gallery);*/
         var galleryArray=gallery.replace(/\r\n/g,"\n").split("\n");
             /*console.log(galleryArray);*/ 
         //--------------
         var newInstitute={name:name,image:image,body:body,address:address,website:website,affliation:affliationArray,courses:coursesArray,gallery:galleryArray};
         Institute.findByIdAndUpdate(req.params.id,newInstitute,function(err,updatedBlog){
  	        if(err){
              res.redirect("/institutes");
  	        }else{
              res.redirect("/institutes/"+req.params.id);
  	        }
          });
       });
    //destroy----------
        app.delete("/institutes/:id",function(req,res){
	    Institute.findByIdAndRemove(req.params.id,function(err){
		if(err){
        res.redirect("/institutes");
		}else{
        res.redirect("/institutes");
		}
		
	       });
       });
   
    //------------------------------------------------------------------------ 
     
    //Institutes/:id/courses
    app.get("/institutes/:id/courses",function(req,res){
    	Institute.findById(req.params.id,function(err,foundInstitute){
       		if(err){
       			res.redirect("/institutes");
       		}else{
       			/*console.log(foundInstitute.name);
       			console.log(foundInstitute.courses.length);
       			console.log(foundInstitute.courses);*/
       			res.render("courses",{institute:foundInstitute});
       		}
       	});
    })
    //Institutes/:id/courses/edit
    //edit--------
       app.get("/institutes/:id/courses/edit",function(req,res){
       	Institute.findById(req.params.id,function(err,foundInstitute){
       		if(err){
              res.redirect("/institutes/:id/courses");
       		}else{
              res.render("editCourse",{institute:foundInstitute});
       		}
       	});
       }); 
    //Institutes/:id/courses/edit
    //update--------
    app.put("/institutes/:id/courses",function(req,res){
            var peopleObj = req.body;
          /*var peopleArray = Object.values(peopleObj)  ;*/
         
          peopleArray = Object.keys(peopleObj).map(i => peopleObj[i])
          /*console.log(peopleArray);	
          console.log(peopleArray.length);*/
          var arrayTest1=peopleArray.flat();
          /*console.log(arrayTest1);
          console.log(arrayTest1.length);*/
          var arrayTest2a=arrayTest1.slice(0,arrayTest1.length/2);
          var arrayTest2b=arrayTest1.slice(arrayTest1.length/2,arrayTest1.length);
          /*console.log(arrayTest2a);
           console.log(arrayTest2b);*/
           var subjectList=[];
           /*console.log(arrayTest2a.length)
           console.log(arrayTest2b.length)*/
         for(var i=0;i<arrayTest2b.length;i++){
             
             var subjects={
         	title:String,
         	body:String
             };
           subjects.title=arrayTest2a[i];
           subjects.body=arrayTest2b[i];
           subjectList.push(subjects);             

         }
        /* console.log(subjectList);*/
          var data={};
         //--------------
         Institute.findById(req.params.id,function(err,foundInstitute){
       		if(err){
              console.log("Errorrrrre")       		
          }else{
          	data=foundInstitute;
              /*console.log(foundInstitute.name);*/
              data.courses=subjectList;
              /*console.log(subjectList);
              console.log(data.courses);*/
            Institute.findByIdAndUpdate(req.params.id,data,function(err,updatedData){
  	        if(err){
              res.redirect("/institutes");
  	        }else{
                       res.redirect("/institutes/"+req.params.id+"/courses");
  	                  }
                  });



       		}
       	 });
       });
    //Institutes/:id/gallery
    app.get("/institutes/:id/gallery",function(req,res){
    	Institute.findById(req.params.id,function(err,foundInstitute){
       		if(err){
       			res.redirect("/institutes");
       		}else{
       			/*console.log(foundInstitute.name);
       			console.log(foundInstitute.courses.length);
       			console.log(foundInstitute.courses);*/
       			res.render("gallery",{institute:foundInstitute});
       		}
       	});
    })
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //kolos
    app.get("/kolos",function(req,res){
    	res.render("kolos");
    });
    //careers
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    app.get("/careers",function(req,res){
    	res.render("careers");
    });
       //Notofication
       app.post("/careers/notification",function(req,res){
            //email
        var email=req.body.email;

        var newNotification={email:email,notified:false};
        Notification.create(newNotification,function(err,newCounsellor){
        	if(err){
             console.log("Error");
        	}else{
             res.redirect("/careers");
        	}
        }); 
       });
       //Careers
       app.post("/careers",function(req,res){
        //firstName
        var firstName=req.body.firstName;
        //lastName
        var lastName=req.body.lastName;
        //email
        var email=req.body.email;
        //position
        var position=req.body.position;
        //file
        var file=req.body.file;

        var newCareers={firstName:firstName,lastName:lastName,email:email,position:position,file:file,notified:false};
        Careers.create(newCareers,function(err,newCounsellor){
        	if(err){
             console.log("Error");
        	}else{
             res.redirect("/careers");
        	}
        }); 
       });










    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //contacts
    app.get("/contacts",function(req,res){
    	res.render("contacts");
    });
    app.post("/contacts",function(req,res){
        //firstName
        var name=req.body.name;
        //email
        var email=req.body.email;
        //position
        var questions=req.body.questions;
        

        var newContacts={name:name,email:email,questions:questions,notified:false};
        Contacts.create(newContacts,function(err,newCounsellor){
        	if(err){
             console.log("Error");
        	}else{
             res.redirect("/contacts");
        	}
        }); 
       });



    //Server starts
    app.listen(3000,function(){
    	console.log("Server started at port 3000");
    });
    //"C:\Program Files\MongoDB\Server\4.2\bin\mongo"
/*    var area = document.getElementById("area");             
var lines = area.value.replace(/\r\n/g,"\n").split("\n");*/