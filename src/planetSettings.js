const planetSettings = {
	sun: {
		scale: 9,
		offset: 0,
		texture: "./textures/sun.jpg",
		normalMap: null,
		bumpMap: null,
		alphaMap: null,
		specularMap: null,
		emissive: 0xaa7700,
		startYPos: Math.random() * 6.28319,
		speed: {
			orbit: 0,
			rotation: 0
		},
		data: {
			name: "Solen",
			radius: 696340, // km
			rotation: 1997, // km/h
			orbit: 0 // km/s
		}
	},
	mercury: {
		scale: 1,
		offset: 15,
		texture: "./textures/mercury.jpg",
		normalMap: null,
		bumpMap: null,
		alphaMap: null,
		specularMap: null,
		emissive: 0x000000,
		startYPos: Math.random() * 6.28319,
		speed: {
			orbit: 47.9,
			rotation: 0.00301
		},
		data: {
			name: "Merkur",
			radius: 2439.7,
			rotation: 10.83,
			orbit: 47.9
		}
	},
	venus: {
		scale: 2.8,
		offset: 22,
		texture: "./textures/venus.jpg",
		normalMap: null,
		bumpMap: null,
		alphaMap: null,
		specularMap: null,
		emissive: 0x000000,
		startYPos: Math.random() * 6.28319,
		speed: {
			orbit: 35,
			rotation: 0.00181
		},
		data: {
			name: "Venus",
			radius: 6051.8,
			rotation: 6.52,
			orbit: 35
		}
	},
	earth: {
		scale: 3,
		offset: 31,
		texture: "./textures/earth.jpg",
		normalMap: null,
		bumpMap: "./textures/earth_bump_map.jpg",
		alphaMap: null,
		specularMap: "./textures/earth_specular_map.jpg",
		emissive: 0x000000,
		startYPos: 0,
		speed: {
			orbit: 29.8,
			rotation: 0.43722
		},
		data: {
			name: "Jorden",
			radius: 6371,
			rotation: 1574,
			orbit: 29.8
		}
	},
	moon: {
		scale: 0.5,
		offset: 5,
		texture: "./textures/moon.jpg",
		normalMap: null,
		bumpMap: null,
		alphaMap: null,
		specularMap: null,
		emissive: 0x000000,
		startYPos: 3.8,
		speed: {
			orbit: 1,
			rotation: 0
		},
		data: {
			name: "Månen",
			radius: 1737.4,
			rotation: 3683,
			orbit: 1
		}
	},
	mars: {
		scale: 2,
		offset: 40,
		texture: "./textures/mars.jpg",
		normalMap: null,
		bumpMap: null,
		alphaMap: null,
		specularMap: null,
		emissive: 0x000000,
		startYPos: Math.random() * 6.28319,
		speed: {
			orbit: 24.1,
			rotation: 0.24056
		},
		data: {
			name: "Mars",
			radius: 3389.5,
			rotation: 866,
			orbit: 24.1
		}
	},
	jupiter: {
		scale: 8,
		offset: 53,
		texture: "./textures/jupiter.jpg",
		normalMap: null,
		bumpMap: null,
		alphaMap: null,
		specularMap: null,
		emissive: 0x000000,
		startYPos: Math.random() * 6.28319,
		speed: {
			orbit: 13.1,
			rotation: 1.266194
		},
		data: {
			name: "Jupiter",
			radius: 69911,
			rotation: 45583,
			orbit: 13.1
		}
	},
	saturn: {
		scale: 3,
		offset: 69,
		texture: "./textures/saturn.jpg",
		normalMap: null,
		bumpMap: null,
		alphaMap: null,
		specularMap: null,
		emissive: 0x000000,
		startYPos: Math.random() * 6.28319,
		speed: {
			orbit: 9.7,
			rotation: 1.023333
		},
		data: {
			name: "Saturn",
			radius: 58232,
			rotation: 36840,
			orbit: 9.7
		}
	},
	uranus: {
		scale: 2.8,
		offset: 79,
		texture: "./textures/uranus.jpg",
		normalMap: null,
		bumpMap: null,
		alphaMap: null,
		specularMap: null,
		emissive: 0x000000,
		startYPos: Math.random() * 6.28319,
		speed: {
			orbit: 6.8,
			rotation: 0.410944
		},
		data: {
			name: "Uranus",
			radius: 25362,
			rotation: 14794,
			orbit: 6.8
		}
	},
	neptune: {
		scale: 5,
		offset: 88,
		texture: "./textures/neptune.jpg",
		normalMap: null,
		bumpMap: null,
		alphaMap: null,
		specularMap: null,
		emissive: 0x000000,
		startYPos: Math.random() * 6.28319,
		speed: {
			orbit: 5.4,
			rotation: 0.269972
		},
		data: {
			name: "Neptun",
			radius: 24622,
			rotation: 9719,
			orbit: 5.4
		}
	},
}

export default planetSettings;