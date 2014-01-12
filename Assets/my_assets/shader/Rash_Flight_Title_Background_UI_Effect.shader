Shader "RashFlightTitleBackgroundUIEffect"
{
	Properties
	{
		_MainTex ( "Base (RGB)", 2D ) = "white" {}
		_MultiplyTitle( "Multiply Title", Range( 0, 5 ) ) = 1
		_MultiplyStart( "Multiply Start", Range( 0, 5 ) ) = 1
		_MultiplyConfig( "Multiply Config", Range( 0, 5 ) ) = 1
		_MultiplyCopyRight( "Multiply CopyRight", Range( 0, 5 ) ) = 1
		_StartY( "Start Y", Range( 0, 1 ) ) = 1
		_ConfigY( "Config Y", Range( 0, 1 ) ) = 1
		_CopyRightY( "CopyRight Y", Range( 0, 1 ) ) = 1
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
			float _MultiplyTitle;
			float _MultiplyStart;
			float _MultiplyConfig;
			float _MultiplyCopyRight;
			float _StartY;
			float _ConfigY;
			float _CopyRightY;
			
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
				base = tex2D( _MainTex, IN.texcoord );
				
				// CopyRight Button
				if( IN.texcoord.y <= _CopyRightY ){
					base *= _MultiplyCopyRight;
				}
				// Config Button
				if( IN.texcoord.y > _CopyRightY && IN.texcoord.y <= _ConfigY ){
					base *= _MultiplyConfig;
				}
				// Start Button
				if( IN.texcoord.y > _ConfigY && IN.texcoord.y <= _StartY ){
					base *= _MultiplyStart;
				}
				// Title
				if( IN.texcoord.y > _StartY ){
					base *= _MultiplyTitle;
				}
				
				return base;
			}

		ENDCG
		}
    }
}
