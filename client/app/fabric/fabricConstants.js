angular.module('common.fabric.constants', [])

.service('FabricConstants', [function() {

  return {
    credentials: true,
    // loaderContainer: ".xx-container",
    // loaderTemplate: "<span class='canvas-load-spinner'><img src='{loaderIcon}'></span>",
    resizable: true,
    canvasContainer: "fiera-canvas",
    canvas: true,
    // util: {
    //   mediaRoot: '../../media/'
    // },
    fonts: {
      standart: [
        'Arial',
        'Arial Black',
        'Comic Sans MS',
        'Lucida Console',
        'Tahoma',
        'Times New Roman'
      ],
      google: [
        'Pacifico' ,
        'Croissant One' ,
        'Architects Daughter' ,
        'Emblema One' ,
        'Graduate' ,
        'Eczar Handgloves' ,
        'Oswald' ,
        'Oxygen' ,
        'Old Standard TT Handgloves' ,
        'Indie Flower' ,
        'Courgette' ,
        'Gruppo' ,
        'Ranchers' ,
        'Raleway Handgloves' ,
        'Open Sans' ,
        'Josephin Slab' ,
        'Abril Fatface' ,
        'Old Standard TT' ,
        'Indie Flower' ,
        'Pacifico' ,
        'Dancing Script' ,
        'Shadows Into Light' ,
        'Amatic SC' ,
        'Courgette' ,
        'Permanent Marker' ,
        'Cookie' ,
        'Great Vibes' ,
        'Tangerine' ,
        'Bad Script' ,
        'Rochester' ,
        'Pinyon Script' ,
        'Parisienne' ,
        'Rouge Script' ,
        'Fondamento' ,
        'Felipa' ,
        'Comfortaa' ,
        'Poiret One' ,
        'Pirata One' ,
        'Luckiest Guy' ,
        'Monoton' ,
        'Cabin Sketch' ,
        'Limelight' ,
        'Fredericka the Great' ,
        'Cinzel Decorative' ,
        'Gruppo' ,
        'UnifrakturMaguntia' ,
        'Vast Shadow' ,
        'Lorinda Shadow' ,
        'Prata' ,
        'Marcellus' ,
        'Italiana' ,
        'Josephin Sans' ,
        'Rajdhani Light' , 
        'Work Sans Extra-Light' ,
        'Quicksand Light' ,
        'Open Sans Condensed' ,
        'Lato Light' ,
        'Julius Sans One' ,
        'Sarpanch Bold' ,
        'Cormorant Garamond Light' ,
        'Trirong Extra-Light' ,
        'Cormorant Upright Light'
      ],
      custom: [
        //"Open Sans"
      ]
    },
    /*css: [
      "../../media/fonts/stylesheet.css"
    ],*/
    toolbar : {
      application:  "application-menu",
      canvas:       "slide-menu",
      objects: {
        container: "object-menu"
      }
    },
    prototypes: {
      Image:{
        insertImageFilters: true
      },
      Photo:{
        insertPhotoFrames: true,
        insertPhotoClip: true
      },
      Object: {
        originX: "center",
        insertRemove: true
      },
      Text: {
      },
      Textbox: {
        insertToggleListStyleType: true,
        listStyleType: "decimal",
        textAligmentTools: true,
        textPadding: 50
      },
      SlideCanvas : {
        dotsPerUnit: 10,
        history: true,
        historyTools: true,
        zoomToPointEnabled: true,
        backgroundColor:  '#ffffff',
        //handModeEnabled: true,
       // mouseWheelEnabled: true,
       // zoomCtrlKey: false,
        minZoomFactor: 0.9,
        changeDimensionOnZoom: false,
        autoCenterAndZoomOutEnabled: true,
        insertUploadImage: true,
        insertRenderArea: true
      }
    },
    presetSizes: [
      {
        name: 'Portrait (8.5 x 11)',
        height: 1947,
        width: 1510
      },
      {
        name: 'Landscape (11 x 8.5)',
        width: 1947,
        height: 1510
      },
      {
        name: 'Business Card (3.5 x 2)',
        height: 368,
        width: 630
      },
      {
        name: 'Postcard (6 x 4)',
        height: 718,
        width: 1068
      },
      {
        name: 'Content/Builder Product Thumbnail',
        height: 400,
        width: 760
      },
      {
        name: 'Badge',
        height: 400,
        width: 400
      },
      {
        name: 'Facebook Profile Picture',
        height: 300,
        width: 300
      },
      {
        name: 'Facebook Cover Picture',
        height: 315,
        width: 851
      },
      {
        name: 'Facebook Photo Post (Landscape)',
        height: 504,
        width: 403
      },
      {
        name: 'Facebook Photo Post (Horizontal)',
        height: 1008,
        width: 806
      },
      {
        name: 'Facebook Full-Width Photo Post',
        height: 504,
        width: 843
      }
    ]
  }

}]);
