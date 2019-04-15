  precision mediump float;
  varying vec3 fragNormal;
  varying vec3 fragPosition;
  void main() {
    vec3 color=fragNormal;
    color.z=color.z;
    gl_FragColor=vec4(color,1.0);
  }