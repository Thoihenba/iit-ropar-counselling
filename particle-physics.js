document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('spiral-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Canvas sizing
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        // Simple reload on resize to recreate targets
        location.reload(); 
    });

    // Physics constants
    const SPRING_K = 0.035;     // Stiffer spring for tighter particle formation
    const FRICTION = 0.85;      // Lower friction to stop floating and snap back faster
    const BROWNIAN = 0.08;      // Slightly increased jitter for a more organic feel
    
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
        mouse.clickForce = 15; // Reduced blast strength as requested
    });
    window.addEventListener('mouseup', () => {
        mouse.clicked = false;
    });

    // Scroll Dispersion
    window.addEventListener('scroll', () => {
        currentScroll = window.scrollY;
    });

    class Particle {
        constructor(x, y, color, objCenterX, objCenterY) {
            // Start scattered randomly
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            
            // Image center for rotation
            this.objCenterX = objCenterX;
            this.objCenterY = objCenterY;
            
            // Store original coordinates relative to center for 3D projection
            this.dx = x - objCenterX;
            this.dy = y - objCenterY;
            
            // Give the object actual 3D volume (thickness) so it's not a flat plane
            // The further from the center, the thinner it gets, like a lenticular galaxy
            let distFromCenter = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
            let maxThickness = 150 - (distFromCenter * 0.3);
            this.dz = (Math.random() - 0.5) * Math.max(20, maxThickness);
            
            // Physics
            this.vx = (Math.random() - 0.5) * 10;
            this.vy = (Math.random() - 0.5) * 10;
            this.size = Math.random() * 1.5 + 0.5;
            this.color = color;
        }

        update(frameCount) {
            // Rotation is stopped as requested, keeping the fixed angle at 0
            let angleY = 0; 
            
            let cosY = Math.cos(angleY);
            let sinY = Math.sin(angleY);
            
            // 1. Rotate around Y-axis (vertical axis)
            let finalX = this.dx * cosY - this.dz * sinY;
            let finalZ = this.dz * cosY + this.dx * sinY;
            
            // Y coordinate is completely unaffected by vertical rotation
            let finalY = this.dy;
            
            // Simple perspective projection (camera focal length ~800)
            let persp = 800 / (800 + finalZ);
            
            // Apply perspective to X and Y
            let curTargetX = this.objCenterX + finalX * persp;
            let curTargetY = this.objCenterY + finalY * persp;
            
            // Scale particle size based on Z-depth for a true 3D feel
            this.currentSize = this.size * persp;

            // 1. Spring Force (pull towards dynamic 3D projected target position)
            let diffX = curTargetX - this.x;
            let diffY = curTargetY - this.y;
            this.vx += diffX * SPRING_K;
            this.vy += diffY * SPRING_K;

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
            let drawSize = this.currentSize || this.size;
            ctx.fillRect(this.x, this.y, drawSize, drawSize);
        }
    }

    function extractParticles(img, destCenterX, destCenterY, customScale, forceWhite = false) {
        const offscreen = document.createElement('canvas');
        const octx = offscreen.getContext('2d');
        
        // Base scale calculation to fit screen, multiplied by custom modifier
        let baseScale = Math.min(width / img.width, height / img.height);
        let finalScale = baseScale * customScale;
        
        let drawW = Math.floor(img.width * finalScale);
        let drawH = Math.floor(img.height * finalScale);
        
        offscreen.width = drawW;
        offscreen.height = drawH;
        
        octx.drawImage(img, 0, 0, drawW, drawH);
        
        const imageData = octx.getImageData(0, 0, drawW, drawH);
        const data = imageData.data;
        
        // Calculate offsets to place image at the requested center point
        let offsetX = Math.floor(destCenterX - drawW / 2);
        let offsetY = Math.floor(destCenterY - drawH / 2);

        // Skip pixels for performance. 
        const skip = forceWhite ? 4 : 5; 
        
        for (let y = 0; y < drawH; y += skip) {
            for (let x = 0; x < drawW; x += skip) {
                let index = (y * drawW + x) * 4;
                let alpha = data[index + 3];
                
                // If pixel is not highly transparent
                if (alpha > 128) {
                    let r = data[index];
                    let g = data[index + 1];
                    let b = data[index + 2];
                    
                    // Filter out dark background pixels
                    if (r + g + b > 150) {
                        let color = forceWhite ? `rgba(255,255,255,${alpha/255})` : `rgba(${r},${g},${b},${alpha/255})`;
                        particles.push(new Particle(x + offsetX, y + offsetY, color, destCenterX, destCenterY));
                    }
                }
            }
        }
    }

    let particles = [];
    
    const spiralImage = new Image();
    
    let imagesLoaded = 0;
    const checkStart = () => {
        imagesLoaded++;
        if (imagesLoaded === 1) {
            // Central Spiral (large)
            extractParticles(spiralImage, width / 2, height / 2, 1.04, false);
            
            animate();
        }
    };

    spiralImage.onload = checkStart;
    spiralImage.onerror = checkStart; // fallback so it doesn't hang if one fails

    // Load base64 or fallback images
    if (typeof SPIRAL_BASE64 !== 'undefined') spiralImage.src = SPIRAL_BASE64;
    else spiralImage.src = 'spiral.png';

    let frameCount = 0;

    function animate() {
        frameCount++;
        
        // Clear screen with a very faint trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.3)';
        ctx.fillRect(0, 0, width, height);

        // Decay click forces
        if (mouse.clickForce > 0) mouse.clickForce *= 0.9;

        // Dynamically calculate maximum scroll distance of the document
        let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        
        // We add a 150px buffer so it hits 0% opacity BEFORE the absolute physical bottom.
        // This prevents the "flicker" caused by browser overscroll or margin discrepancies.
        let adjustedMax = Math.max(1, maxScroll - 150);
        
        // Calculate global opacity
        let globalOpacity = 1 - (currentScroll / adjustedMax);
        
        // Clamp between 0 and 1
        globalOpacity = Math.max(0, Math.min(1, globalOpacity));
        
        // Apply quadratic easing so the tail of the fade feels much smoother to the human eye
        globalOpacity = globalOpacity * globalOpacity;
        
        ctx.globalAlpha = globalOpacity;

        particles.forEach(p => {
            p.update(frameCount);
            p.draw(ctx);
        });
        
        ctx.globalAlpha = 1.0; // Reset for background clear on next frame

        requestAnimationFrame(animate);
    }
});
