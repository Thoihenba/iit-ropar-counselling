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
    const BROWNIAN = 0.01;      // Dramatically reduced jitter for elegance
    
    let mouse = { x: -1000, y: -1000, clicked: false };
    let currentScroll = window.scrollY;
    
    // Track Mouse for Magnetic Hover
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    // The glow/wave system has been completely scrapped.

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
            this.size = (Math.random() * 1.5 + 0.5) * 0.9;
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

            // 3. Magnetic Hover (Fluid Surface Tension)
            let mdx = mouse.x - this.x;
            let mdy = mouse.y - this.y;
            let distToMouse = Math.sqrt(mdx * mdx + mdy * mdy);
            
            // Smoothly pull particles towards mouse if within radius
            if (distToMouse < 200) {
                let pullStrength = (200 - distToMouse) / 200;
                this.vx += (mdx / distToMouse) * pullStrength * 0.4;
                this.vy += (mdy / distToMouse) * pullStrength * 0.4;
            }

            // Apply friction and velocity
            this.vx *= FRICTION;
            this.vy *= FRICTION;
            this.x += this.vx;
            this.y += this.vy;
        }

        draw(ctx) {
            let drawSize = this.currentSize || this.size;
            
            ctx.fillStyle = this.color;
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
    let bgParticles = []; // Edge data streams
    
    // Generate ambient background data streams
    for(let i=0; i<150; i++) {
        bgParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: (Math.random() * 1.0 + 0.3) * 0.9,    // Smaller particles (reduced by 10%)
            speedY: (-Math.random() * 0.15 - 0.05) * 1.3, // 30% faster movement
            alpha: Math.random() * 0.15 + 0.05,   // Duller baseline opacity
            glowIntensity: 0, // Current glow state
            glowTarget: 0     // Target glow state for smooth interpolation
        });
    }
    
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
    let introProgress = 0;

    function animate() {
        frameCount++;
        
        // Smooth intro fade-in over ~1.5 seconds (100 frames at 60fps)
        if (introProgress < 1) {
            introProgress += 0.01;
            if (introProgress > 1) introProgress = 1;
        }
        // Elegant sine easing for the intro
        let easedIntro = Math.sin(introProgress * Math.PI / 2);
        
        // Clear screen with a very faint trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.3)';
        ctx.fillRect(0, 0, width, height);

        // Dynamically calculate maximum scroll distance of the document
        let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        
        // We add a 150px buffer so it hits 0% opacity BEFORE the absolute physical bottom.
        // This prevents the "flicker" caused by browser overscroll or margin discrepancies.
        let adjustedMax = Math.max(1, maxScroll - 150);
        
        // Calculate global opacity based on scroll
        let scrollOpacity = 1 - (currentScroll / adjustedMax);
        scrollOpacity = Math.max(0, Math.min(1, scrollOpacity));
        scrollOpacity = scrollOpacity * scrollOpacity; // Quadratic easing for scroll
        
        // Final global opacity combines scroll fade and the intro float-in fade
        let globalOpacity = scrollOpacity * easedIntro;
        
        // --- AMBIENT BACKGROUND LAYER ---
        // 1. Ambient Depth Field (Giant blurred gradients to create cinematic depth)
        ctx.globalAlpha = globalOpacity * 0.6; // Slightly more transparent than main
        
        let grad1 = ctx.createRadialGradient(width * 0.15, height * 0.3, 0, width * 0.15, height * 0.3, width * 0.4);
        grad1.addColorStop(0, 'rgba(25, 45, 35, 0.15)'); // Soft dark green
        grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        let grad2 = ctx.createRadialGradient(width * 0.85, height * 0.7, 0, width * 0.85, height * 0.7, width * 0.4);
        grad2.addColorStop(0, 'rgba(50, 40, 10, 0.15)'); // Soft dark gold
        grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);

        // 2. Data Streams (Edge drifting streaks with glowing heads)
        bgParticles.forEach(p => {
            p.y += p.speedY;
            if (p.y < -10) p.y = height + 10;
            
            // Randomly trigger a brighter glow (aiming for 20-30% active at any time)
            if (Math.random() < 0.0015) { 
                p.glowTarget = Math.random() * 0.8 + 0.4; // Brighter target intensity
            }
            
            // Smoothly interpolate the glow
            p.glowIntensity += (p.glowTarget - p.glowIntensity) * 0.015;
            
            // Slowly decay target back to 0 so it fades out naturally
            p.glowTarget *= 0.992;
            
            // Draw the streak (tail)
            ctx.globalAlpha = p.alpha * globalOpacity * 0.3; // Fainter tail
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)'; // Duller gold
            ctx.lineWidth = p.size;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x, p.y - p.speedY * 30); // Tail length follows path
            ctx.stroke();
            
            // Draw the head (core)
            ctx.globalAlpha = p.alpha * globalOpacity;
            ctx.fillStyle = 'rgba(255, 220, 100, 0.8)'; // Slightly brighter head
            ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size*2, p.size*2);
            
            // Draw the luminescent fuzzy glow around the head
            if (p.glowIntensity > 0.02) {
                ctx.globalAlpha = p.glowIntensity * globalOpacity;
                
                // Radial gradient for a soft, highly luminescent bloom
                let radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
                radGrad.addColorStop(0, 'rgba(255, 240, 120, 0.9)'); // Brighter, luminescent glow
                radGrad.addColorStop(1, 'rgba(255, 240, 120, 0)');
                ctx.fillStyle = radGrad;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // --- MAIN FOREGROUND LAYER ---
        ctx.globalAlpha = globalOpacity;

        particles.forEach(p => {
            p.update(frameCount);
            p.draw(ctx);
        });
        
        ctx.globalAlpha = 1.0; // Reset for background clear on next frame

        requestAnimationFrame(animate);
    }
});
