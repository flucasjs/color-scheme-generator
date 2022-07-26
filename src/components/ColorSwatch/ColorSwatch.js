import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ColorSwatch = ({schemeColor, copyToClipboard, i, isDesktop}) => {
  const [copied, setCopied] = React.useState(false);

  const containerVariants = {
    hidden: {
      x: "-100vw"
    },
    initial: {
      x: "0vw", 
      transition: { 
        delay: `${(isDesktop ? (5 - i) : i) / 10}`, 
        mass: 0.4
      }
    },
    exit: {
      x: "100vw", 
      transition: { 
        delay: `${(isDesktop ? (5 - i) : i) / 10}`, 
        mass: 0.4
      }
    },
    hover: isDesktop ? { 
      y: -10,
      zIndex: 1,
      color: '#f8e112',
      borderRadius: "10px"
    } : { 
      y: 5,
      scaleY: 1.1,
      zIndex: 1
    }
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="initial"
        whileHover="hover"
        exit="exit"
        key={schemeColor} 
        className={'color-container'} 
        style={{'--bg-color': `#${schemeColor}`}} 
        onClick={(e) => {
          copyToClipboard(schemeColor, e);
          setCopied(true);
          setTimeout(() => {
            setCopied(false)
          }, 1000);
        }}
      >   
        <motion.span 
          className={`color-text`} 
          whileHover={{ color: '#f8e112'}}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {schemeColor}
        </motion.span>
        <AnimatePresence>
          {
            copied && <motion.span 
              className={`copied-text`} 
              initial={{opacity: 0}} 
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            >
              Copied!
            </motion.span>
          }
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

export default ColorSwatch;