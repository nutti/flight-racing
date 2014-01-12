Shader "RashFlightTitleBackgroundEffect"
{
	Properties
	{
		_MainTex ( "Base (RGB)", 2D ) = "white" {}
		_Color ( "Tint", Color ) = ( 1, 1, 1, 1 )
		_CenterX ( "CenterX", Range( 0, 1 ) ) = 0
		_CenterY ( "CenterY", Range( 0, 1 ) ) = 0
		_Width ( "Width", Range( 0, 1 ) ) = 0
		_Height ( "Height", Range( 0, 1 ) ) = 0
		_ThickNess ( "Thickness", Range( 0, 0.3 ) ) = 0
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
			float _CenterX;
			float _CenterY;
			float _Width;
			float _Height;
			float _ThickNess;
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
				float dxl = -0.001f;
				float dxr = -0.001f;
				float dyt = -0.001f;
				float dyb = -0.001f;
				float left;
				float right;
				float top;
				float bottom;
				base = tex2D( _MainTex, IN.texcoord ) * _Color;
				mix = tex2D( _MixTex, IN.texcoord ).a * _Multiply * tex2D( _MixTex, IN.texcoord ).r / _ThickNess;
				left = _CenterX - _Width / 2.0f;
				right = _CenterX + _Width / 2.0f;
				top = _CenterY - _Height / 2.0f;
				bottom = _CenterY + _Height / 2.0f;
				add = ( 0, 0, 0, 0 );
				
				if( abs( IN.texcoord.x - left ) < _ThickNess ){
					dxl = abs( IN.texcoord.x - left );
				}
				if( abs( IN.texcoord.x - right ) < _ThickNess ){
					dxr = abs( IN.texcoord.x - right );
				}
				if( abs( IN.texcoord.y - top ) < _ThickNess ){
					dyt = abs( IN.texcoord.y - top );
				}
				if( abs( IN.texcoord.y - bottom ) < _ThickNess ){
					dyb = abs( IN.texcoord.y - bottom );
				}
				
				if( dxl > 0.0f ){
					if( tex2D( _MixTex, IN.texcoord ).r > 0.0f ){
						add += ( _ThickNess - dxl ) * mix;
					}
				}
				if( dxr > 0.0f ){
					if( tex2D( _MixTex, IN.texcoord ).r > 0.0f ){
						add += ( _ThickNess - dxr ) * mix;
					}
				}
				if( dyt > 0.0f ){
					if( tex2D( _MixTex, IN.texcoord ).r > 0.0f ){
						add += ( _ThickNess - dyt ) * mix;
					}
				}
				if( dyb > 0.0f ){
					if( tex2D( _MixTex, IN.texcoord ).r > 0.0f ){
						add += ( _ThickNess - dyb ) * mix;
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
