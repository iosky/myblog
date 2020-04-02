<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
// canvas初始化
let canvas,
  bodyW,
  bodyH,
  context,
  // 常量定义
  maxParticles,
  hero,
  blueDot
export default {
  name: 'PageNotFoundBg',
  data() {
    return {
      particles: [],
      initNum: 0
    }
  },
  methods: {
    // 初始化
    init() {
      // canvas初始化
      canvas = this.$refs.canvas
      bodyW = canvas.width = document.body.clientWidth
      bodyH = canvas.height = document.body.clientHeight
      context = canvas.getContext('2d')
      blueDot = 10 // 蓝色点最多的个数
      // 常量定义
      maxParticles = 15 // 所有点的最多个数
      hero = 0 // 当前已生成的蓝点的个数
      // 定义粒子，并生成
      this.particles = [] // 粒子数组
      this.initNum = this.populate(maxParticles) // 生成粒子，并返回粒子个数
    },
    // 生成粒子
    populate(num) {
      for (let i = 0; i < num; i++) {
        setTimeout(() => {
          this.particles.push(new Particle(context, i))
        }, i * 2)
      }
      return this.particles.length
    },
    // 清除界面，通过改变全局透明度， 以形成拖尾效果
    clear() {
      context.globalAlpha = 0.03
      context.fillStyle = '#FFFFFF'
      context.fillRect(0, 0, bodyW, bodyH)
      context.globalAlpha = 1
    },
    // 运行动画
    update() {
      this.particles = this.particles.filter(val => val.move())
      if (this.particles.length < this.initNum) {
        populate(1)
      }
      this.clear()
      requestAnimationFrame(this.update.bind(this))
    }
  },
  mounted() {
    this.init()
    this.update()
  }
}
class Particle {
  constructor(canvas) {
    let random = Math.random()
    this.canvas = canvas
    this.x = bodyW / 2 + (Math.random() * 200 - Math.random() * 200)
    this.y = bodyH / 2 + (Math.random() * 200 - Math.random() * 200)
    this.s = Math.random() * 2
    this.a = 0
    this.w = bodyW
    this.h = bodyH
    this.radius = random > 0.2 ? Math.random() : Math.random() * 0.5
    this.color = '#EEE'

    if (hero < blueDot) {
      this.color = '#6C63FF'
      this.radius = 2
      hero++
    }
  }

  render() {
    this.canvas.beginPath()
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.canvas.lineWidth = 2
    this.canvas.fillStyle = this.color
    this.canvas.fill()
    this.canvas.closePath()
  }

  move() {
    this.x += Math.cos(this.a) * this.s
    this.y += Math.sin(this.a) * this.s
    this.a += Math.random() * 0.7 - 0.35

    // 边界判断
    if (this.x < 0 || this.x > this.w - this.radius) {
      return false
    }
    if (this.y < 0 || this.y > this.h - this.radius) {
      return false
    }

    this.render()
    return true
  }
}
</script>