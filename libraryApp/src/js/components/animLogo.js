export const animLogo = () => {
  const {set, timeline} = gsap;
  if (document.querySelector('#eye')) {
    // anim Eyelid
    CSSPlugin.defaultTransformPerspective = 1000;
    const topEyelid = document.querySelector('#top-eyelid')
    const bottomEyelid = document.querySelector('#bottom-eyelid')
    const pupil = document.querySelector('#pupil')
    const eyelashes = document.querySelector('#eyelashes');
    const tlEyelashes = timeline({ defaults: { repeat: -1, repeatDelay: 6, } })

    const topEndEyelid = "M1.75848 18.8602C12.5 18.9716 15.5 18.8602 35.6835 18.9716"
    const topStartEyelid = "M1.75848 18.8602C7.53334 12.3797 22.4031 3.32933 35.6835 18.9716"

    const bottomEndEyelid = "M1.75848 18.4145C11.5 18.3031 20.5 18.4145 35.6835 18.3031"
    const bottomStartEyelid = "M1.75848 18.4145C7.53334 24.895 22.4031 33.9453 35.6835 18.3031"



    set(eyelashes, { transformOrigin: 'bottom', y: 8, scaleY: -1 })
    set(pupil, { transformOrigin: 'center', scale: 0, opacity: 0 })
    set(topEyelid, { attr: { d: topEndEyelid }, opacity: 0, })
    set(bottomEyelid, { attr: { d: bottomEndEyelid }, opacity: 0, })


    tlEyelashes.to(eyelashes, { y: 0, scaleY: 1.2, })
    tlEyelashes.fromTo(pupil, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1 }, '<');
    tlEyelashes.to(topEyelid, { attr: { d: topStartEyelid }, opacity: 1 }, '<');
    tlEyelashes.to(bottomEyelid, { attr: { d: bottomStartEyelid }, opacity: 1, }, '<');
  }
}