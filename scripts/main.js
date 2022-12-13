/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
 (function() {

  let currentButton ;

  function handlePlay(event) {
    // Add code for playing sound.
    loadWorkspace(event.target);
    console.log(event.target)
    let code = Blockly.JavaScript.workspaceToCode(Blockly.common.getMainWorkspace());
code += 'MusicMaker.play();';

try {
  eval(code);
} catch (error) {
  console.log(error);
}


function loadWorkspace(button) {
  const workspace = Blockly.getMainWorkspace();
  if (button.blocklySave) {
    Blockly.serialization.workspaces.load(button.blocklySave, workspace);
  }else{
    Blockly.serialization.workspaces.load({}, workspace);
  }
}

  }

  function save(button) {
    // Add code for saving the behavior of a button.
      button.blocklySave = Blockly.serialization.workspaces.save(Blockly.common.getMainWorkspace());
          
  function enableBlocklyMode(e) {
      // ...
    loadWorkspace(currentButton);
  }
  }

  function handleSave() {
    document.body.setAttribute('mode', 'edit');
    save(currentButton);
  }

  function enableEditMode() {
    document.body.setAttribute('mode', 'edit');
    document.querySelectorAll('.button').forEach(btn => {
      btn.removeEventListener('click', handlePlay);
      btn.addEventListener('click', enableBlocklyMode);
    });
  }

  

  function enableMakerMode() {
    document.body.setAttribute('mode', 'maker');
    document.querySelectorAll('.button').forEach(btn => {
      btn.addEventListener('click', handlePlay);
      btn.removeEventListener('click', enableBlocklyMode);
    });
  }



  const toolbox = {
    'kind': 'flyoutToolbox',
    'contents': [
      {
        'kind': 'block',
        'type': 'controls_repeat_ext',
        'inputs': {
          'TIMES': {
            'shadow': {
              'type': 'math_number',
              'fields': {
                'NUM': 5
              }
            }
          }
        }
      },
      {
        'kind':'block',
        'type':'play_sound'
      },

        
      
    ]

  }


  Blockly.defineBlocksWithJsonArray([
    // Block for colour picker.
    {
      "type": "colour_picker",
      "message0": "%1",
      "args0": [
        {
          "type": "field_colour",
          "name": "COLOUR",
          "colour": "#ff0000"
        }
      ],
      "output": "Colour",
      "helpUrl": "%{BKY_COLOUR_PICKER_HELPURL}",
      "style": "colour_blocks",
      "tooltip": "%{BKY_COLOUR_PICKER_TOOLTIP}",
      "extensions": ["parent_tooltip_when_inline"]
    },
    // Block for random colour.
    {
      "type": "colour_random",
      "message0": "%{BKY_COLOUR_RANDOM_TITLE}",
      "output": "Colour",
      "helpUrl": "%{BKY_COLOUR_RANDOM_HELPURL}",
      "style": "colour_blocks",
      "tooltip": "%{BKY_COLOUR_RANDOM_TOOLTIP}"
    }
  ]);
  


  Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    scrollbars: true
  });

 




  function enableBlocklyMode(e) {
    document.body.setAttribute('mode', 'blockly');
    currentButton = e.target;
  }

  document.querySelector('#edit').addEventListener('click', enableEditMode);
  document.querySelector('#done').addEventListener('click', enableMakerMode);
  document.querySelector('#save').addEventListener('click', handleSave);

  enableMakerMode();

})();
