import SwiftUI

struct DecorationStyle {
  var backgroundColor: Color?
  var cornerRadius: CGFloat?
  var border: (width: CGFloat, color: Color)?
  var shadow: (radius: CGFloat, color: Color, opacity: Double, offset: CGSize)?
  var glassEffect: GlassEffect?
  var overflow: Overflow?
}

struct DecorationModifier: ViewModifier {
  let style: DecorationStyle

  private var hasActiveGlassEffect: Bool {
    guard let glassEffect = style.glassEffect else { return false }
    switch glassEffect {
    case .none:
      return false
    default:
      return true
    }
  }

  @ViewBuilder
  private func applyGlassEffect<Content: View>(
    to content: Content,
    glassEffect: GlassEffect,
    cornerRadius: CGFloat?
  ) -> some View {
    if #available(iOS 26.0, *) {
      switch glassEffect {
      case .clear:
        content.background {
          if let cornerRadius {
            RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
              .fill(.clear)
              .glassEffect(.clear)
          } else {
            Rectangle()
              .fill(.clear)
              .glassEffect(.clear)
          }
        }
      case .identity:
        content.background {
          if let cornerRadius {
            RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
              .fill(.clear)
              .glassEffect(.identity)
          } else {
            Rectangle()
              .fill(.clear)
              .glassEffect(.identity)
          }
        }
      case .regular:
        content.background {
          if let cornerRadius {
            RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
              .fill(.clear)
              .glassEffect(.regular)
          } else {
            Rectangle()
              .fill(.clear)
              .glassEffect(.regular)
          }
        }
      case .none:
        content
      }
    } else {
      content
    }
  }

  func body(content: Content) -> some View {
    content
      .voltraIfLet(style.backgroundColor) { content, color in
        content.background(color)
      }
      // Apply glass before decoration overlays (border/shadow) to avoid
      // ActivityKit rendering issues where content may disappear.
      .voltraIfLet(style.glassEffect) { content, glassEffect in
        applyGlassEffect(to: content, glassEffect: glassEffect, cornerRadius: style.cornerRadius)
      }
      // Corner radius/border handling
      .voltraIfLet(style.cornerRadius) { content, radius in
        if let border = style.border {
          content
            .overlay(
              RoundedRectangle(cornerRadius: radius, style: .continuous)
                .stroke(border.color, lineWidth: border.width)
            )
        } else if !hasActiveGlassEffect {
          content.cornerRadius(radius)
        } else {
          content
        }
      }
      // Fallback: If there is NO corner radius, but there IS a border
      .voltraIf(style.cornerRadius == nil && style.border != nil) { content in
        content.border(style.border!.color, width: style.border!.width)
      }
      .voltraIf(style.overflow == .hidden) { view in
        view.clipped()
      }
      .voltraIfLet(style.shadow) { content, shadow in
        content
          .compositingGroup()
          .shadow(
            color: shadow.color.opacity(shadow.opacity),
            radius: shadow.radius,
            x: shadow.offset.width,
            y: shadow.offset.height
          )
      }
  }
}
