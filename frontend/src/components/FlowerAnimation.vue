<template>
    <div class="flower-container">
      <h1 class="romantic-title">{{ message }}</h1>
      <div class="flower">
        <svg ref="flowerSvg" width="400" height="400" viewBox="0 0 400 400">
          <!-- Środek kwiatka -->
          <circle ref="center" cx="200" cy="200" r="20" fill="gold" opacity="0"/>
          
          <!-- Płatki -->
          <path 
            v-for="(petal, index) in petals" 
            :key="index"
            :ref="'petal'+index"
            :d="petal.path"
            fill="none"
            stroke="hotpink"
            stroke-width="3"
          />
          
          <!-- Łodyga -->
          <path 
            ref="stem"
            d="M200,220 L200,350"
            fill="none"
            stroke="green"
            stroke-width="8"
            opacity="0"
          />
          
          <!-- Liście -->
          <path
            ref="leaf1"
            d="M200,280 Q150,250 180,230"
            fill="none"
            stroke="darkgreen"
            stroke-width="5"
            opacity="0"
          />
          <path
            ref="leaf2"
            d="M200,280 Q250,250 220,230"
            fill="none"
            stroke="darkgreen"
            stroke-width="5"
            opacity="0"
          />
        </svg>
      </div>
      
      <button @click="animateFlower" class="romantic-button">
        {{ buttonText }}
      </button>
    </div>
  </template>
  
  <script>
  import { gsap } from 'gsap';
  
  export default {
    data() {
      return {
        message: "",
        buttonText: "Kliknij",
        petals: [],
        animationComplete: false
      }
    },
    mounted() {
      this.createPetals();
    },
    methods: {
      createPetals() {
        const petalCount = 12;
        const centerX = 200;
        const centerY = 200;
        const radius = 80;
        
        for (let i = 0; i < petalCount; i++) {
          const angle = (i * (2 * Math.PI / petalCount));
          const x1 = centerX + radius * Math.cos(angle);
          const y1 = centerY + radius * Math.sin(angle);
          
          // Tworzymy kształt płatka (krzywa Béziera)
          const path = `M${centerX},${centerY} 
                       Q${x1},${y1} 
                       ${centerX + radius * 0.7 * Math.cos(angle + 0.3)},${centerY + radius * 0.7 * Math.sin(angle + 0.3)} 
                       T${centerX},${centerY}`;
          
          this.petals.push({ path });
        }
      },
      animateFlower() {
        if (this.animationComplete) {
          this.resetAnimation();
          return;
        }
        
        const tl = gsap.timeline();
        
        // Animacja środka kwiatka
        tl.to(this.$refs.center, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        });
        
        // Animacja płatków jeden po drugim
        this.petals.forEach((_, index) => {
          tl.to(this.$refs[`petal${index}`], {
            strokeDasharray: this.getPathLength(index),
            strokeDashoffset: 0,
            duration: 0.8,
            opacity: 1,
            ease: "sine.out"
          }, `-=${0.7}`);
        });
        
        // Animacja łodygi
        tl.to(this.$refs.stem, {
          opacity: 1,
          strokeDasharray: this.getPathLength('stem'),
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out"
        }, "-=0.5");
        
        // Animacja liści
        tl.to(this.$refs.leaf1, {
          opacity: 1,
          strokeDasharray: this.getPathLength('leaf1'),
          strokeDashoffset: 0,
          duration: 1,
          ease: "sine.out"
        }, "-=1");
        
        tl.to(this.$refs.leaf2, {
          opacity: 1,
          strokeDasharray: this.getPathLength('leaf2'),
          strokeDashoffset: 0,
          duration: 1,
          ease: "sine.out"
        }, "-=1");
        
        // Końcowe efekty
        tl.to(this.$refs.center, {
          fill: "goldenrod",
          duration: 0.5
        });
        
        tl.to('.romantic-title', {
          text: "huj",
          duration: 2,
          ease: "none"
        });
        
        this.buttonText = "Kliknij, by zresetować";
        this.animationComplete = true;
      },
      getPathLength(ref) {
  let element;

  if (typeof ref === 'number') {
    element = this.$refs[`petal${ref}`];
  } else {
    element = this.$refs[ref];
  }

  if (!element || typeof element.getTotalLength !== 'function') {
    console.warn(`Nie można pobrać długości ścieżki dla:`, ref);
    return 0;
  }

  return element.getTotalLength();
}
,
      resetAnimation() {
        gsap.killTweensOf(this.$refs.center);
        gsap.killTweensOf('.romantic-title');
        
        const allElements = [
          this.$refs.center,
          ...this.petals.map((_, i) => this.$refs[`petal${i}`]),
        this.$refs.stem,
        this.$refs.leaf1,
        this.$refs.leaf2
        ];
        
        gsap.set(allElements, {
          opacity: 0,
          strokeDashoffset: this.getPathLength(0),
          strokeDasharray: "none"
        });
        
        gsap.set(this.$refs.center, { fill: "gold" });
        gsap.set('.romantic-title', { text: "Dla Ciebie..." });
        
        this.buttonText = "Kliknij, by zobaczyć magiczny kwiat";
        this.animationComplete = false;
      }
    }
  }
  </script>
  
  <style scoped>
  .flower-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    font-family: 'Arial', sans-serif;
  }
  
  .romantic-title {
    color: #e91e63;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .flower {
    margin: 2rem 0;
    filter: drop-shadow(0 0 10px rgba(233, 30, 99, 0.3));
  }
  
  .romantic-button {
    padding: 12px 24px;
    background: linear-gradient(45deg, #e91e63, #ff4081);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(233, 30, 99, 0.4);
  }
  
  .romantic-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(233, 30, 99, 0.6);
  }
  
  .romantic-button:active {
    transform: translateY(1px);
  }
  
  path {
    opacity: 0;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  </style>