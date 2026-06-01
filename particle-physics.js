document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('spiral-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Canvas sizing
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles(); // Re-center on resize
    });

    // Physics constants
    const SPRING_K = 0.005;     // Softer spring for slower, floatier motion
    const FRICTION = 0.92;      // Higher friction for smoother gliding
    const BROWNIAN = 0.15;      // Less jitter
    
    let mouse = { x: -1000, y: -1000, clickForce: 0, clicked: false };
    let currentScroll = window.scrollY;
    
    // Track Mouse
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    // Click Repulsion
    window.addEventListener('mousedown', () => {
        mouse.clicked = true;
        mouse.clickForce = 50; // Initial blast strength
    });
    window.addEventListener('mouseup', () => {
        mouse.clicked = false;
    });

    // Scroll Dispersion
    window.addEventListener('scroll', () => {
        currentScroll = window.scrollY;
    });

    class Particle {
        constructor(x, y, color) {
            // Start scattered randomly
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            
            // Target position from the image
            this.targetX = x;
            this.targetY = y;
            
            // Physics
            this.vx = (Math.random() - 0.5) * 10;
            this.vy = (Math.random() - 0.5) * 10;
            this.size = Math.random() * 1.5 + 0.5;
            this.color = color;
        }

        update() {
            // Calculate outward direction from center of screen
            let centerX = width / 2;
            let centerY = height / 2;
            let dxCenter = this.targetX - centerX;
            let dyCenter = this.targetY - centerY;
            let distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter) || 1;
            
            // Push targets outward based on how far we've scrolled down
            let scrollPush = currentScroll * 2.0;
            let curTargetX = this.targetX + (dxCenter / distCenter) * scrollPush;
            let curTargetY = this.targetY + (dyCenter / distCenter) * scrollPush;

            // 1. Spring Force (pull towards dynamic target position)
            let dx = curTargetX - this.x;
            let dy = curTargetY - this.y;
            this.vx += dx * SPRING_K;
            this.vy += dy * SPRING_K;

            // 2. Brownian Motion (jitter)
            this.vx += (Math.random() - 0.5) * BROWNIAN;
            this.vy += (Math.random() - 0.5) * BROWNIAN;

            // 3. Click Repulsion
            if (mouse.clickForce > 0) {
                let mdx = this.x - mouse.x;
                let mdy = this.y - mouse.y;
                let dist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (dist < 150) {
                    let force = (150 - dist) / 150;
                    this.vx += (mdx / dist) * force * mouse.clickForce;
                    this.vy += (mdy / dist) * force * mouse.clickForce;
                }
            }

            // 4. Scroll Dispersion removed (handled by spring target offset above)

            // Apply friction and velocity
            this.vx *= FRICTION;
            this.vy *= FRICTION;
            this.x += this.vx;
            this.y += this.vy;
        }

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    function initParticles() {
        particles = [];
        
        // Use an offscreen canvas to analyze image pixels
        const offscreen = document.createElement('canvas');
        const octx = offscreen.getContext('2d');
        
        // Scale image to fit screen reasonably, scaled up larger
        let scale = Math.min(width / image.width, height / image.height) * 1.3;
        let drawW = Math.floor(image.width * scale);
        let drawH = Math.floor(image.height * scale);
        
        offscreen.width = drawW;
        offscreen.height = drawH;
        
        octx.drawImage(image, 0, 0, drawW, drawH);
        
        const imageData = octx.getImageData(0, 0, drawW, drawH);
        const data = imageData.data;
        
        // Center offsets
        let offsetX = Math.floor((width - drawW) / 2);
        let offsetY = Math.floor((height - drawH) / 2);

        // Skip pixels for performance. Higher skip = fewer particles.
        const skip = 5; 
        
        for (let y = 0; y < drawH; y += skip) {
            for (let x = 0; x < drawW; x += skip) {
                let index = (y * drawW + x) * 4;
                let alpha = data[index + 3];
                
                // If pixel is not highly transparent
                if (alpha > 128) {
                    let r = data[index];
                    let g = data[index + 1];
                    let b = data[index + 2];
                    
                    // Filter out dark background pixels. The spiral is bright green/gold.
                    // This ensures only the glowing parts are converted to particles.
                    if (r + g + b > 200) {
                        let color = `rgba(${r},${g},${b},${alpha/255})`;
                        particles.push(new Particle(x + offsetX, y + offsetY, color));
                    }
                }
            }
        }
    }

    let particles = [];
    const image = new Image();

    image.onload = () => {
        initParticles();
        animate();
    };
    
    image.onerror = (e) => {
        animate();
    };

    // Set src AFTER onload to ensure event fires even for cached/base64 images
    if (typeof SPIRAL_BASE64 !== 'undefined') {
        image.src = SPIRAL_BASE64;
    } else {
        image.src = 'spiral.png';
    }

    function animate() {
        // Clear screen with a very faint trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.3)';
        ctx.fillRect(0, 0, width, height);

        // Decay click forces
        if (mouse.clickForce > 0) mouse.clickForce *= 0.9;

        particles.forEach(p => {
            p.update();
            p.draw(ctx);
        });

        requestAnimationFrame(animate);
    }
});
