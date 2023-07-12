import { createContext, useEffect, useState } from "react";




const UserContext=createContext(
{   idschools: "",
    id:"",
    idvisitors: "",
    Email: [],
    Κωδικός:[],
    Όνομα: [],
    Τηλέφωνο: [],
    Διεύθυνση: [],
    ΤΚ: [], 
    PostalCode : "",
    Πόλη:[],
    Προάστια: [],
    Περιοχή: [],
    Ιστοσελίδα: [],
    Χοροί: [],
    image: [],
    Πτυχία: [],
    ΑνώτερεςΣχολές: [],
    ΔιαθέσιμηΑίθουσα: [],
    Επίθετο: [],
    Φύλο:[],
    Ηλικία:[],
    Περιοχές: [],
    Coordinates : "",
    Προυπηρεσία: [],
    Performer: [],
    Βιογραφικό: [],
    Linkedin: [],
    Facebook: [],
    Instagram: [],
    Πρόγραμμα: [],
    ΜέγεθοςΑίθουσας: [],
    ΠρόγραμμαΦώτο: "",
    ExtraDances: "",
    ProfileColors : [""],
    FavoriteTeachers: [],
    FavoriteSchools: [],
    Κυριακή: [],
    Δευτέρα: [],
    Τρίτη: [],
    Τετάρτη: [],
    Πέμπτη: [],
    Παρασκευή: [],
    Σάββατο: [],
    isMobile: [],
    Άλλα: [],
    AltView: "",
    newUser:  (favoriteMeetup) => {},
    LogOut: (favoriteMeetup) => {},


})




export function UserContextProvider(props) {



    const[user,setUser]=useState({
        idschools: "",
        id:"",
        idvisitors: "",
        Email: [],
        Κωδικός:[],
        Όνομα: [],
        Τηλέφωνο: [],
        Διεύθυνση: [],
        ΤΚ: [], 
        PostalCode : "",
        Πόλη:[],
        Προάστια: [],
        Περιοχή: [],
        Ιστοσελίδα: [],
        Χοροί: [],
        image: [],
        Πτυχία: [],
        ΑνώτερεςΣχολές: [],
        ΔιαθέσιμηΑίθουσα: [],
        Επίθετο: [],
        Φύλο:[],
        Ηλικία:[],
        Περιοχές: [],
        Coordinates : "",
        Προυπηρεσία: [],
        Performer: [],
        Βιογραφικό: [],
        Linkedin: [],
        Facebook: [],
        Instagram: [],
        Πρόγραμμα: [],
        ΜέγεθοςΑίθουσας: [],
        Ενοικίαση : [],
        ΠρόγραμμαΦώτο: "",
        ExtraDances: "",
        ProfileColors : [""],
        FavoriteTeachers: [],
        FavoriteSchools: [],
        Info: [],
        Κυριακή: [],
        Δευτέρα: [],
        Τρίτη: [],
        Τετάρτη: [],
        Πέμπτη: [],
        Παρασκευή: [],
        Σάββατο: [],
        isMobile: [],
        Άλλα: [],
        AltView: "",
    })







    function newUserHandler (test) {
        let copy = Object.assign({}, user);
        
        
        for (const [key, value] of Object.entries(test)) {
            copy[key]=value;}

        setUser(copy);



    }





    function LogoutHandler () {
        localStorage.removeItem("tokenData");
        setUser({
            idschools: "",
            id:"",
            idvisitors: "",
            Email: [],
            Κωδικός:[],
            Όνομα: "",
            Τηλέφωνο: [],
            Διεύθυνση: [],
            ΤΚ: [], 
            PostalCode : "",
            Πόλη:[],
            Προάστια: [],
            Περιοχή: [],
            Ιστοσελίδα: [],
            Χοροί: [],
            image: [],
            Πτυχία: [],
            ΑνώτερεςΣχολές: [],
            ΔιαθέσιμηΑίθουσα: [],
            Ενοικίαση : [],
            Επίθετο: [],
            Φύλο:[],
            Ηλικία:[],
            Περιοχές: [],
            Coordinates : "",
            Προυπηρεσία: [],
            Performer: [],
            Βιογραφικό: [],
            Linkedin: [],
            Facebook: [],
            Instagram: [],
            Πρόγραμμα: [],
            ΜέγεθοςΑίθουσας: [],
            ΠρόγραμμαΦώτο: "",
            ExtraDances: "",
            ProfileColors : [""],
            FavoriteTeachers: [],
            FavoriteSchools: [],
            Info: [],
            Κυριακή: [],
            Δευτέρα: [],
            Τρίτη: [],
            Τετάρτη: [],
            Πέμπτη: [],
            Παρασκευή: [],
            Σάββατο: [],
            isMobile: user.isMobile,
            Άλλα: [],
            AltView: "",
        });
        location.replace('/');
    }


    const context = {
        idschools: user.idschools,
        id:user.id,
        idvisitors: user.idvisitors,
        Email: user.Email,
        Κωδικός:user.Κωδικός,
        Όνομα: user.Όνομα,
        Τηλέφωνο: user.Τηλέφωνο,
        Διεύθυνση: user.Διεύθυνση,
        ΤΚ: user.ΤΚ, 
        PostalCode: user.PostalCode,
        Πόλη:user.Πόλη,
        Προάστια: user.Προάστια,
        Περιοχή: user.Περιοχή,
        Ιστοσελίδα: user.Ιστοσελίδα,
        Χοροί: user.Χοροί,
        image: user.image,
        Πτυχία: user.Πτυχία,
        ΑνώτερεςΣχολές: user.ΑνώτερεςΣχολές,
        ΔιαθέσιμηΑίθουσα: user.ΔιαθέσιμηΑίθουσα,
        Ενοικίαση : user.Ενοικίαση,
        Επίθετο: user.Επίθετο,
        Φύλο:user.Φύλο,
        Ηλικία:user.Ηλικία,
        Περιοχές: user.Περιοχές,
        Coordinates : user.Coordinates,
        Προυπηρεσία: user.Προυπηρεσία,
        Performer: user.Performer,
        Βιογραφικό: user.Βιογραφικό,
        Linkedin: user.Linkedin,
        Facebook: user.Facebook,
        Instagram: user.Instagram,
        Πρόγραμμα: user.Πρόγραμμα,
        ΜέγεθοςΑίθουσας: user.ΜέγεθοςΑίθουσας,
        ΠρόγραμμαΦώτο: user.ΠρόγραμμαΦώτο,
        ExtraDances: user.ExtraDances,
        ProfileColors : user.ProfileColors,
        FavoriteTeachers: user.FavoriteTeachers,
        FavoriteSchools: user.FavoriteSchools,
        Info: user.Info,
        Κυριακή: user.Κυριακή,
        Δευτέρα: user.Δευτέρα,
        Τρίτη: user.Τρίτη,
        Τετάρτη: user.Τετάρτη,
        Πέμπτη: user.Πέμπτη,
        Παρασκευή: user.Παρασκευή,
        Σάββατο: user.Σάββατο,
        isMobile: user.isMobile,
        Άλλα : user.Άλλα,
        AltView: user.AltView,
        newUser: newUserHandler,
        LogOut: LogoutHandler


    }



    return (
        <UserContext.Provider value={context}>
          {props.children}
        </UserContext.Provider>
      );


}

export default UserContext;