"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Star,
  Sparkles,
  ArrowRight,
  Download,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import ProjectImageSlider from "@/components/ProjectImgeSlider";
import { useRouter } from "next/navigation";

export default function CreativePortfolio() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const menuItems = [
    { id: "inicio", label: "Inicio" },
    { id: "sobre-mi", label: "Sobre Mí" },
    { id: "experiencia", label: "Experiencia" },
    { id: "portafolio", label: "Portafolio" },
    { id: "contacto", label: "Contacto" },
  ];

  const skills = [
    { name: "Blender", level: 70 },
    { name: "Photoshop", level: 70 },
    { name: "Krita", level: 60 },
  ];

  const projects = [
    {
      title: "Ilustraciones 2D",
      description: "Colección de ilustraciones digitales con estilo único",
      image: [
        "/resources/background_final.png",
        "/resources/ilustracion.jpg",
        "/resources/Lucy_ilust.png",
        "/resources/proyecto_segunda_luz_natural.png",
      ],
      category: "Ilustración",
    },
    {
      title: "Diseño de Personajes",
      description: "Desarrollo completo de personajes para animación",
      image: [
        "/resources/ANNA_TURN_AROUND.png",
        "/resources/DON ESTEBAN_TURNAROUND.png",
        "/resources/EMILIANO_TURNAROUND.png",
        "/resources/IGNACIO_TURNAROUND.png",
        "/resources/LUCY_TURN_AROUND.png",
        "/resources/personaje_turn_around.png",
      ],
      category: "Personajes",
    },
    {
      title: "Modelado 3D",
      description: "Modelos arquitectónicos y productos en 3D",
      image: [
        "/resources/BIBLIOTECA.png",
        "/resources/bodegon.png",
        "/resources/danup.png",
        "/resources/GYM.png",
        "/resources/I.png",
        "/resources/K.png",
      ],
      category: "3D",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) =>
        document.getElementById(item.id)
      );
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(menuItems[index].id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Michelle M.
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-pink-600 bg-pink-100"
                    : "text-gray-600 hover:text-pink-500"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-pink-100 rounded-full -z-10"
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-pink-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-pink-50 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="inicio"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-orange-300/20 to-yellow-300/20" />
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-pink-300/30 rounded-full blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-24 h-24 bg-orange-300/30 rounded-full blur-xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 30, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10 text-3xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="flex items-center gap-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Sparkles className="w-6 h-6 text-pink-500" />
              <span className="text-pink-600 font-medium">Artista Digital</span>
            </motion.div>

            <motion.h1
              className="text-7xl md:text-9xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Michelle
              </span>
              <br />
              <span className="text-gray-800">Martínez</span>
            </motion.h1>

            <motion.p
              className="text-3xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span className="text-pink-600 font-semibold">
                Ilustración 2D
              </span>{" "}
              y{" "}
              <span className="text-orange-600 font-semibold">Modelado 3D</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-3 rounded-full w-[200px] h-[50px] text-xl"
                onClick={() => scrollToSection("portafolio")}
              >
                Ver Portafolio
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full w-[200px] h-[50px] text-xl"
                onClick={() => router.push("/cv")}
              >
                <Download className="mr-2 w-4 h-4" />
                Descargar CV
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="relative z-10"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/resources/personaje.jpg"
                alt="Michelle Martinez - Artista Digital"
                width={600}
                height={600}
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                scale: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              <Star className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                rotate: -360,
                y: [0, -10, 0],
              }}
              transition={{
                rotate: {
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                y: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="sobre-mi"
        className="py-20 bg-gradient-to-r from-pink-50 to-orange-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                Sobre Mí
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <Image
                    src="/resources/personaje_prop.png"
                    alt="Sobre Michelle"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  Ingeniera en Animación Digital y Efectos Visuales
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Soy una persona{" "}
                  <span className="text-pink-600 font-semibold">
                    comprometida
                  </span>{" "}
                  y{" "}
                  <span className="text-orange-600 font-semibold">
                    creativa
                  </span>
                  , que en cada proyecto busca aportar propuestas innovadoras,
                  cuidando tanto los detalles técnicos como la expresividad
                  visual.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Me adapto con facilidad a diferentes entornos y metodologías
                  de trabajo, siempre enfocada en crear experiencias visuales
                  únicas y memorables.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  Habilidades Técnicas
                </h4>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                Experiencia
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-xl border-0 bg-gradient-to-br from-pink-50 to-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full" />
                    <h3 className="text-2xl font-bold text-gray-800">
                      Experiencia Profesional
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <motion.div
                      className="border-l-2 border-pink-200 pl-6 pb-6"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge className="mb-2 bg-pink-100 text-pink-700 hover:bg-pink-200">
                        Mar 2024 - Jul 2024
                      </Badge>
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">
                        Animadora 2D
                      </h4>
                      <p className="text-gray-600 mb-2">
                        Diseño de escenarios para el teaser animado "El son de
                        la bruja"
                      </p>
                      <p className="text-gray-600 mb-2">
                        Animación rough para escenas del teaser
                      </p>
                    </motion.div>

                    <motion.div
                      className="border-l-2 border-orange-200 pl-6 pb-6"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge className="mb-2 bg-orange-100 text-orange-700 hover:bg-orange-200">
                        Sep 2024 - Dic 2024
                      </Badge>
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">
                        Modeladora 3D
                      </h4>
                      <p className="text-gray-600 mb-2">
                        Desarrollo de modelo 3D del campus del Tecnológico de
                        Estudios Superiores de Jocotitlán
                      </p>
                      <p className="text-gray-600 mb-2">
                        Incluyendo edificios e infraestructura para integración
                        en un mapa interactivo
                      </p>
                    </motion.div>

                    <motion.div
                      className="border-l-2 border-pink-200 pl-6"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge className="mb-2 bg-pink-100 text-pink-700 hover:bg-pink-200">
                        Abril 2025
                      </Badge>
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">
                        Diseño de Personajes
                      </h4>
                      <p className="text-gray-600">
                        Diseño y concept art de personajes para el teaser "El
                        eco del silencio"
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-xl border-0 bg-gradient-to-br from-orange-50 to-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full" />
                    <h3 className="text-2xl font-bold text-gray-800">
                      Formación
                    </h3>
                  </div>

                  <motion.div
                    className="space-y-4"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                      2021 - Actualidad
                    </Badge>
                    <h4 className="font-semibold text-xl text-gray-800">
                      Tecnológico de Estudios Superiores de Jocotitlán
                    </h4>
                    <p className="text-lg text-gray-700 font-medium">
                      Ingeniería en Animación Digital y Efectos Visuales
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Formación integral en técnicas de animación 2D y 3D,
                      modelado, texturizado, iluminación, y efectos visuales.
                      Desarrollo de proyectos creativos y técnicos que combinan
                      arte y tecnología.
                    </p>
                  </motion.div>

                  <div className="mt-8 p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2">
                      Áreas de Especialización
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {["Animación 2D", "Modelado 3D", "Concept Art"].map(
                        (area) => (
                          <Badge
                            key={area}
                            variant="secondary"
                            className="bg-white/80"
                          >
                            {area}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portafolio"
        className="py-20 bg-gradient-to-r from-orange-50 to-pink-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Portafolio
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Una selección de mis trabajos más destacados en ilustración,
              diseño de personajes y modelado 3D
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden shadow-xl border-0 bg-white hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      {project.image.length > 1 ? (
                        <ProjectImageSlider
                          images={project.image}
                          title={project.title}
                        />
                      ) : (
                        <Image
                          src={project.image[0] || "/placeholder.svg"}
                          alt={project.title}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.div
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-5 h-5 text-gray-700" />
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <Badge className="mb-3 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 border-0">
                        {project.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-full"
            >
              Ver Más Proyectos
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                Contacto
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto rounded-full" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              ¿Tienes un proyecto en mente? Me encantaría colaborar contigo
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-pink-50/50">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        Información de Contacto
                      </h3>

                      <div className="space-y-6">
                        <motion.div
                          className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                            <Phone className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              Teléfono
                            </p>
                            <p className="text-gray-600">7121332914</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Email</p>
                            <p className="text-gray-600">
                              perlamichmr@gmail.com
                            </p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              Ubicación
                            </p>
                            <p className="text-gray-600">
                              Ixtlahuaca, Edo. México
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gradient-to-br from-pink-100 to-orange-100 p-8 rounded-2xl">
                      <h4 className="text-xl font-bold text-gray-800 mb-4">
                        ¿Listo para crear algo increíble?
                      </h4>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Estoy disponible para proyectos de ilustración,
                        animación y modelado 3D. Trabajemos juntos para dar vida
                        a tus ideas.
                      </p>

                      <div className="space-y-4">
                        <Button
                          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white rounded-full py-3"
                          size="lg"
                        >
                          <Mail className="mr-2 w-4 h-4" />
                          Enviar Mensaje
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full py-3"
                          size="lg"
                        >
                          <Download className="mr-2 w-4 h-4" />
                          Descargar CV
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300">
              © 2024 Michelle Martínez. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Diseñado con ❤️ y mucha creatividad
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
