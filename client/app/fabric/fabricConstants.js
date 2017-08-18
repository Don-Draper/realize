angular.module('common.fabric.constants', [])

  .service('FabricConstants', ['dataService',function(dataService ) {

    return {
      debug: true,
      credentials: true,
      // loaderContainer: ".xx-container",
      // loaderTemplate: "<span class='canvas-load-spinner'><img src='{loaderIcon}'></span>",
      stretchable: true,
      canvasContainer: "fiera-canvas",
      // mediaRoot: '/assets/',
      applicationToolbarContainer: "application-menu",
      canvasToolbarContainer: "slide-menu",
      objectsToolbarContainer: "object-menu",
      draggableArea: ".image-builder-container",
      // objectsToolbarOptions: {
      //   marginY: -50
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
          'Lora' ,
          'Lato' ,
          'Abril Fatface' ,
          'Droid Sans' ,
          'Jim Nightshade' ,
          'Croissant One' ,
          'Architects Daughter' ,
          'Arizonia' ,
          'Great Vibes' ,
          'Cormorant Handgloves' ,
          'Emblema One' ,
          'Graduate' ,
          'Hammersmith One' ,
          'Oswald' ,
          'Oxygen' ,
          'Krona One' ,
          'Indie Flower' ,
          'Courgette' ,
          'Gruppo' ,
          'Ranchers'
        ],
        custom: [
          "Open Sans"
        ]
      },
      prototypes: {
        Toolbar : {
          colorpickerOptions: {
            position: "left top"
          }
        },
        Clipart: {
          galleryCategory: "clipart",
          tools: [
            //"source",
            "colors",
            "*"
          ]
        },
        Object: {
          originX: "center",
          tools: [
            "center",
            "remove"
          ]
        },
        Text: {
          tools: [
            "fill",
            "textBold",
            "textItalic",
            "textUnderline",
            "fontFamily",
            "textFontSize",
            "*"
          ]
        },
        Textbox: {
          tools: [
            "textAlign",
            "toggleListStyleType",
            "*"
          ],
          listStyleType: "decimal",
          textAligmentTools: true,
          listTextPadding: 50
        },
        Canvas: {
          stretchable: true,
          handModeEnabled: true,
          zoomToPointEnabled: true,
          mouseWheelEnabled: true,
          minZoomFactor: 0.9,
          zoomCtrlKey: false,
          changeDimensionOnZoom: false,
          autoCenterAndZoomOutEnabled: true,
          tools: [
            "backgroundColor",
            "uploadImage",
            "zoomOut",
            "zoomIn",
            "renderArea"
          ]
        },
        Slide : {
          backgroundColor:  "#ffffff"
        }
      },
      getLibraryElements: function(){
        return dataService.images; /*[
          {
            type: "image",
            src: "assets/mary9.svg"
          },
          {
            type: "image",
            src: "assets/c-anglican.svg"
          },
          {
            type: "image",
            src: "assets/jesus31.svg"
          }
        ];
        // dataService.images;*/
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
