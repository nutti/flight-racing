Shader "RashFlightTitleBackground"
{
	Properties
	{
		_MainTex ( "Base (RGB)", 2D ) = "white" {}
		_Color ( "Tint", Color ) = ( 1, 1, 1, 1 )
		_X ( "X", Range( 0, 1 ) ) = 0
		_Y ( "Y", Range( 0, 1 ) ) = 0
		_Width ( "Width", Range( 0, 0.30 ) ) = 0
		_Multiply( "Multiply", Range( 0, 5 ) ) = 1
		_MixTex ( "Mix (RGB)", 2D ) = "white" {}
	}
	
	SubShader
    {
    	Tags
    	{
    		"Queue"="Transparent"
    		"IgnoreProjector"="True"
    		"RenderType"="Transparent"
    	}
    	
		LOD 200
		
		Blend SrcAlpha OneMinusSrcAlpha
		ZWrite Off
		Cull Off
		Lighting Off
		ZTest Always
		Fog
		{
			Mode off
		}
		
		Pass
		{
		CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			#include "UnityCG.cginc"

			sampler2D _MainTex;
			float4 _MainTex_ST;
			sampler2D _MixTex;
			fixed4 _Color;
			float _X;
			float _Y;
			float _Width;
			fixed _Multiply;
			
			struct appdata_t
			{
				float4 vertex	: POSITION;
				float2 texcoord	: TEXCOORD0;
			};
			
			struct v2f
			{
				float4 vertex	: POSITION;
				float2 texcoord	: TEXCOORD0;
			};
			
			v2f vert( appdata_t IN )
			{
				v2f OUT;
				OUT.vertex = mul( UNITY_MATRIX_MVP, IN.vertex );
				OUT.texcoord = TRANSFORM_TEX( IN.texcoord, _MainTex );
				
				return OUT;
			}
			
			fixed4 frag( v2f IN ) : COLOR
			{
				fixed4 base;
				fixed mix;
				fixed4 add;
				float dx;
				float dy;
				base = tex2D( _MainTex, IN.texcoord ) * _Color;
				mix = tex2D( _MixTex, IN.texcoord ).a * _Multiply;
				dx = abs( IN.texcoord.x - _X );
				dy = abs( IN.texcoord.y - _Y );
				add = ( 0, 0, 0, 0 );
				if( dx < _Width ){
					if( tex2D( _MixTex, IN.texcoord ).r > 0.0 ){
						add += ( _Width - dx ) * mix * tex2D( _MixTex, IN.texcoord ).r / _Width;
					}
				}
				if( dy < _Width ){
					if( tex2D( _MixTex, IN.texcoord ).r > 0.0 ){
						add += ( _Width - dy ) * mix * tex2D( _MixTex, IN.texcoord ).r / _Width;
					}
				}
				
				base.b += add.b;
				base.g += add.g;
				
				return base;
			}

		ENDCG
		}
    }
}
