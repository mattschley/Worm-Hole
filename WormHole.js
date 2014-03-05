// Wormhole, a WebGL game by Matthew Schley (mss099)
//
// Vertex shader program----------------------------------
var VSHADER_SOURCE = 
  'uniform mat4 u_ModelMatrix;\n' +
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// Fragment shader program----------------------------------
var FSHADER_SOURCE = 
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif GL_ES\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';


var ANGLE_STEP = 45.0;
var callbackId = 0;
function main() {
  // Retrieve <canvas> 
  var canvas = document.getElementById('webgl');

  // Get the rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  var n = initVertexBuffer(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

	gl.enable(gl.DEPTH_TEST); 
	gl.depthFunc(gl.LESS);
  
  
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) { 
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }
  // model matrix
  var modelMatrix = new Matrix4();
  
  // rotation angle 
  var currentAngle = 0.0;

 // begin drawing
  var tick = function() {
    currentAngle = animate(currentAngle);  
    draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);  
    console.log('currentAngle=%lf',currentAngle);
    callbackId = requestAnimationFrame(tick, canvas);   
    	
  }; // function created to allow the game to be paused upon mouse click
  canvas.onmousedown = function(ev){ if (callbackId){cancelAnimationFrame(callbackId); callbackId = 0;}
                                     else {g_last = Date.now(); tick();}};

  tick();							
	
}

function initVertexBuffer(gl) {

  var sq3 = Math.sqrt(3.0); 

// array 
  var colorShapes = new Float32Array([

    // Pendulum Vertices

		 0.00, 0.00, 0.00, 1.00,   1.0,0.65,0.0,  
     0.20, 0.00, 0.00, 1.00,    1.0,0.65,0.0,
     0.0,  0.50, 0.00, 1.00,    1.0,0.65,0.0,
     0.20, 0.01, 0.00, 1.00,    1.0,0.65,0.0, 
     0.20, 0.50, 0.00, 1.00,    1.0,0.65,0.0,
     0.01, 0.50, 0.00, 1.00,    1.0,0.65,0.0,

     // Yellow Hexagon
     1.0,  -1.0, 0.0, 1.0,    1.0, 1.0, 0.0,  
     2.0, 0.0, 0.0, 1.0,    0.0, 1.0, 1.0,  
     1.0, 1.0, 0.0, 1.0,    1.0, 0.0, 1.0,  
    -1.0, 1.0, 0.0, 1.0,    1.0, 1.0, 0.0,  
    -2.0,  0.0, 0.0, 1.0,    0.0, 1.0, 1.0,  
     -1.0,  -1.0, 0.0, 1.0,    1.0, 0.0, 1.0,

     // 12-point Light Star
     0.0,  1.0, 0.0, 1.0,    0.0, 1.0, 0.0,  
     -0.5, (-sq3/2), 0.0, 1.0,    1.0, 0.0, 0.0,  
     (sq3/2), 0.5, 0.0, 1.0,    0.0, 0.0, 1.0,  
      -1.0,  0.0, 0.0, 1.0,    0.0, 1.0, 0.0,  
     (sq3/2), -0.5, 0.0, 1.0,    1.0, 0.0, 0.0,  
     -0.5, (sq3/2), 0.0, 1.0,    0.0, 0.0, 1.0,  
      0.0,  -1.0, 0.0, 1.0,    0.0, 1.0, 0.0,  
     0.5, (sq3/2), 0.0, 1.0,    1.0, 0.0, 0.0,  
     (sq3/2), -0.5, 0.0, 1.0,    0.0, 0.0, 1.0,  
      1.0,  0.0, 0.0, 1.0,    0.0, 1.0, 0.0,  
     (-sq3/2), 0.5, 0.0, 1.0,    1.0, 0.0, 0.0,  
     0.5, (-sq3/2), 0.0, 1.0,    0.0, 0.0, 1.0,  



     // Green Hexagon
     1.0,  -1.0, 0.0, 1.0,    0.0, 1.0, 0.0,  
     2.0, 0.0, 0.0, 1.0,    0.0, 1.0, 0.0,  
     1.0, 1.0, 0.0, 1.0,    0.0, 1.0, 0.0,  
    -1.0, 1.0, 0.0, 1.0,    0.0, 1.0, 0.0,  
    -2.0,  0.0, 0.0, 1.0,    0.0, 1.0, 0.0,  
     -1.0,  -1.0, 0.0, 1.0,    0.0, 1.0, 0.0,

     // Blue Hexagon
     1.0,  -1.0, 0.0, 1.0,    0.0, 0.0, 1.0,  
     2.0, 0.0, 0.0, 1.0,    0.0, 0.0, 1.0,  
     1.0, 1.0, 0.0, 1.0,    0.0, 0.0, 1.0,  
    -1.0, 1.0, 0.0, 1.0,    0.0, 0.0, 1.0,  
    -2.0,  0.0, 0.0, 1.0,    0.0, 0.0, 1.0,  
     -1.0,  -1.0, 0.0, 1.0,    0.0, 0.0, 1.0,

     //Blurred hexagon inside wormhole
     1.0,  -1.0, 0.0, 1.0,    1.0, 0.0, 0.0,  
     2.0, 0.0, 0.0, 1.0,    0.0, 1.0, 0.0,  
     1.0, 1.0, 0.0, 1.0,    0.0, 0.0, 1.0,  
    -1.0, 1.0, 0.0, 1.0,    0.0, 0.0, 1.0,  
    -2.0,  0.0, 0.0, 1.0,    0.0, 1.0, 0.0,  
     -1.0,  -1.0, 0.0, 1.0,    1.0, 0.0, 0.0,



    
  ]);
  var nn = 42;		// 6 rectangle vertices;  6 yellow hex, 12 star, 6 green hex, 6 blue hex, 6 blurred hex
	
	
  // buffer object
  var shapeBufferHandle = gl.createBuffer();  
  if (!shapeBufferHandle) {
    console.log('Failed to create the shape buffer object');
    return false;
  }


  gl.bindBuffer(gl.ARRAY_BUFFER, shapeBufferHandle);

  gl.bufferData(gl.ARRAY_BUFFER, colorShapes, gl.STATIC_DRAW);

  var FSIZE = colorShapes.BYTES_PER_ELEMENT; 

  //Vertex Shader's position-input variable: 
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // how to retrieve VBO position data :
  gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, FSIZE * 7, 0);						
  									
  gl.enableVertexAttribArray(a_Position);  
  									
  //Vertex Shader's color-input variable;
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  //  how to retrieve VBO color data:
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 7, FSIZE * 4);			
  									
  									
  gl.enableVertexAttribArray(a_Color);  
  									
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return nn;
}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
  // Clear <canvas> 
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  modelMatrix.setRotate(-currentAngle, 0, 0, 1);
  modelMatrix.translate(0.55, 0, 0);
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.LINE_LOOP, 12, 12);
  
  // large rectangle
  modelMatrix.setTranslate(0.0,0.0, 0.0);
  modelMatrix.rotate(currentAngle, 0, 0, 1);
  modelMatrix.translate(-0.1, 0,0);   
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);


 // middle rectangle
  modelMatrix.translate(0.1, 0.5, 0);       
  modelMatrix.scale(0.7,0.7,0.7);      
  modelMatrix.rotate(currentAngle*2.0, 0,0,1);  
  modelMatrix.translate(-0.1, 0, 0);      
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
 

  
  // small rectangle
  modelMatrix.translate(0.1, 0.5, 0.0);      
  modelMatrix.scale(0.7,0.7,0.7);       
  modelMatrix.rotate(currentAngle*10.0, 0,0,1);  
  modelMatrix.translate(-0.1, 0, 0);      
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);


//blur
modelMatrix.setTranslate(0.0,0.0,0.0);
modelMatrix.rotate(currentAngle*5.0, 0,0,1)
modelMatrix.scale(0.35, 0.35, 0.35);
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
gl.drawArrays(gl.TRIANGLE_FAN, 36,6);

//Blue Hex
modelMatrix.setTranslate(0.0,0.0,0.0);
modelMatrix.rotate(currentAngle*5.0, 0,0,1)
modelMatrix.scale(0.40, 0.40, 0.40);
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
gl.drawArrays(gl.TRIANGLE_FAN, 30,6);


// Green Hexagon
modelMatrix.setTranslate(0.0,0.0,0.0);
modelMatrix.rotate(currentAngle*5.0, 0,0,1)
modelMatrix.scale(0.45, 0.45, 0.45);
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
gl.drawArrays(gl.TRIANGLE_FAN, 24,6);

// Yellow Hexagon

modelMatrix.setTranslate(0.0,0.0,0.0);
modelMatrix.rotate(currentAngle*5.0, 0,0,1)
modelMatrix.scale(0.5, 0.5, 0.5);
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
gl.drawArrays(gl.TRIANGLE_FAN, 6,6);

//Begin Fractalization of Yellow Hex

modelMatrix.translate(1.0,1.0,0.0);
modelMatrix.scale(0.5,0.5,0.5);
modelMatrix.rotate(currentAngle*5.0, 0,0,1)
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
gl.drawArrays(gl.TRIANGLE_FAN, 6,6);

modelMatrix.translate(1.0,1.0,0.0);
modelMatrix.scale(0.5,0.5,0.5);
modelMatrix.rotate(currentAngle*5.0, 0,0,1)
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
gl.drawArrays(gl.TRIANGLE_FAN, 6,6);

modelMatrix.translate(1.0,1.0,0.0);
modelMatrix.scale(0.5,0.5,0.5);
modelMatrix.rotate(currentAngle*5.0, 0,0,1)
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
gl.drawArrays(gl.TRIANGLE_FAN, 6,6);

modelMatrix.translate(1.0,1.0,0.0);
modelMatrix.scale(0.5,0.5,0.5);
modelMatrix.rotate(currentAngle*5.0, 0,0,1)
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
gl.drawArrays(gl.TRIANGLE_FAN, 6,6);

modelMatrix.translate(1.0,1.0,0.0);
modelMatrix.scale(0.5,0.5,0.5);
modelMatrix.rotate(currentAngle*5.0, 0,0,1)
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
gl.drawArrays(gl.TRIANGLE_FAN, 6,6);

modelMatrix.translate(1.0,1.0,0.0);
modelMatrix.scale(0.5,0.5,0.5);
modelMatrix.rotate(currentAngle*5.0, 0,0,1)
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
gl.drawArrays(gl.TRIANGLE_FAN, 6,6);

modelMatrix.translate(1.0,1.0,0.0);
modelMatrix.scale(0.5,0.5,0.5);
modelMatrix.rotate(currentAngle*5.0, 0,0,1)
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
gl.drawArrays(gl.TRIANGLE_FAN, 6,6);

modelMatrix.translate(1.0,1.0,0.0);
modelMatrix.scale(0.5,0.5,0.5);
modelMatrix.rotate(currentAngle*5.0, 0,0,1)
gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
gl.drawArrays(gl.TRIANGLE_FAN, 6,6);

  

}

var g_last = Date.now();

function animate(angle) {
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  
  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle %= 360;
}

function moreCCW() {

  ANGLE_STEP += 10; 
}

function lessCCW() {

  ANGLE_STEP -= 10; 
}
function openWormHole(){

ANGLE_STEP += 500;

}
function crazy(){
  ANGLE_STEP += 1000;
}
function reload(){
location.reload();

}
