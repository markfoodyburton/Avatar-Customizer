import React, { Component } from "react";
import * as THREE from "three";

import ColorPicker from "../../color-picker";
import Swatches from "../../color-picker2"
import {EditorPage} from "../../editor-page"

import Material from "../../material"

import shirt from "./shirt_default.png";
import jacket from "./jacket_default.png";

//import ae from "./ae.png";
 import duck from "./duck.png";
//import gt from "./gt.png"; 

import gs from "./gs.png"; 
import dvcon from "./dvcon-europe-2020-logo.png"; 

const shirtColors = ["#f2f2f2", "#212b58", "#7f90b6", "#E0C448","#387f22","#262525"]

var assets = {
  shirt: {
    selected: shirtColors[Math.floor(Math.random() * Math.floor(shirtColors.length))],
    colors: shirtColors,
    materials: []
  },
  jacket: {
    selected: 'none',
    colors: shirtColors,
    materials: []
  },
  front: {
    selected: dvcon,
    textures: [dvcon,gs,duck],
    materials: []
  },
  back: {
    selected: 'none',
    textures: [dvcon,gs,duck],
    materials: []
  }
}

export default class ShirtEditor extends Component {
    constructor(props) {
      super(props);
      assets.shirt.materials = [new Material(this.props.model.material.clone(), "shirt", [shirt])];

      assets.front.materials = [new Material(this.props.model.material.clone(), "logoFront", 
                                  assets.front.textures, false, true, 148,476, 220,270, true)]

      assets.jacket.materials = [new Material(this.props.model.material.clone(), "jacket", [jacket])]

      assets.back.materials = [new Material(this.props.model.material.clone(), "logoBack", 
                                  assets.back.textures, false, true, 662,476,220,270, true)]

      this.materials = [
        ...assets.shirt.materials,
        ...assets.front.materials,
        ...assets.jacket.materials,
        ...assets.back.materials
      ]

      assets.jacket.materials[0].setActive(false);
      assets.back.materials[0].setActive(false);

      this.editorPage = React.createRef();
    }

    render() {
      return (
        <EditorPage ref={this.editorPage}>
            <label>Shirt</label>
            <div>
            <Swatches 
              colors={assets.shirt.colors} 
              canDisable={false}
              selected={assets.shirt.selected}
              material={assets.shirt.materials}
            />
            </div>
            <label>Jacket</label>
            <div>
              <Swatches 
                colors={assets.jacket.colors} 
                canDisable={true}
                selected={assets.jacket.selected}
                material={assets.jacket.materials}
              />
            
            </div>
            <label>Front</label>
            <div>

              <Swatches
                selected={assets.front.selected}
                textures={assets.front.textures}
                canDisable={true}
                canUpload={true}
                material={assets.front.materials}
                />
            </div>
            <label>Back</label>
            <div>
              <Swatches
                selected={assets.back.selected}
                textures={assets.back.textures}
                canDisable={true}
                canUpload={true}
                material={assets.back.materials}
              />

            </div>
        </EditorPage>
      );

    }
}
