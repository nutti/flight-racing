Shader "MaskedTexture_my"
{   
   Properties
   {
 	  _Color  ("Color", Color) = (1.0, 1.0, 1.0, 1.0)
	  _MainTex ("Base (RGB)", 2D) = "white" {}
      _Mask ("Culling Mask", 2D) = "white" {}
   }
   
   SubShader
   {
   Tags {"Queue"="Transparent"}
     // Tags { "RenderType" = "Opaque" }
      ZWrite Off
      CGPROGRAM
      #pragma surface surf Lambert alpha
      
      struct Input
      {
      	float2 uv_MainTex;
      	float2 uv_Mask;
      };
      
      sampler2D _MainTex;
      sampler2D _Mask;
      half4 _Color;
      
      void surf( Input IN, inout SurfaceOutput o ){
        half4 col = tex2D( _MainTex, IN.uv_MainTex );
        half4 m = tex2D( _Mask, IN.uv_Mask );
      	o.Albedo.r = col.r * _Color.x;
      	o.Albedo.g = col.g * _Color.y;
      	o.Albedo.b = col.b * _Color.z;
      	o.Alpha = m.a;
      }
      
      ENDCG
   }
   
   FallBack "Diffuse"
}