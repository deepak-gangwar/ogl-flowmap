precision highp float;
#define GLSLIFY 1

uniform sampler2D tMap;
uniform sampler2D tFlow;

varying vec2 vUv;

void main() {
  vec3 flow = texture2D(tFlow, vUv).rgb;

  vec2 uv = vUv;

  uv -= flow.xy * (0.15 * 0.5);

  vec4 color = texture2D(tMap, uv);

  gl_FragColor = color;
}
